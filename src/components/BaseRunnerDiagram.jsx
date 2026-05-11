import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// ─── Perspective field geometry (400 × 500 viewBox) ────────────────────────

const HP    = { x: 200, y: 435 };
const BASE1 = { x: 320, y: 272 };
const BASE2 = { x: 200, y: 148 };
const BASE3 = { x: 80,  y: 272 };
const MOUND = { x: 200, y: 225 };

const WALL_L  = { x: 10,  y: 105 };
const WALL_CP = { x: 200, y: 15  };  // bezier control point for outfield arc
const WALL_R  = { x: 390, y: 105 };

// Fielder label positions in perspective coords
const FIELDERS = {
  P:    { x: 200, y: 222 },
  C:    { x: 200, y: 392 },
  '1B': { x: 344, y: 260 },
  '2B': { x: 264, y: 200 },
  '3B': { x: 56,  y: 260 },
  SS:   { x: 136, y: 200 },
  LF:   { x: 72,  y: 122 },
  CF:   { x: 200, y: 76  },
  RF:   { x: 328, y: 122 },
};

// ─── Coordinate mapping ─────────────────────────────────────────────────────

// Old 400×400 top-down → new 400×500 perspective
function toPersp({ x: ox, y: oy }) {
  const t = Math.max(0, Math.min(1.1, (305 - oy) / 255));
  const ny = t <= 0.41
    ? HP.y - (t / 0.41) * (HP.y - BASE1.y)
    : BASE1.y - ((t - 0.41) / 0.59) * (BASE1.y - 28);
  const nx = 200 + (ox - 200) * (1 + t * 0.55);
  return {
    x: Math.max(5, Math.min(395, Math.round(nx))),
    y: Math.max(28, Math.min(448, Math.round(ny))),
  };
}

// Perspective → old 400×400 top-down (for interactive mode storage)
function fromPersp({ x: nx, y: ny }) {
  const t = ny >= BASE1.y
    ? ((HP.y - ny) / (HP.y - BASE1.y)) * 0.41
    : 0.41 + ((BASE1.y - ny) / (BASE1.y - 28)) * 0.59;
  const tc = Math.max(0, Math.min(1.1, t));
  const oy = Math.round(305 - tc * 255);
  const ox = Math.round(200 + (nx - 200) / (1 + tc * 0.55));
  return {
    x: Math.max(0, Math.min(400, ox)),
    y: Math.max(0, Math.min(400, oy)),
  };
}

// ─── Outfield wall bezier ───────────────────────────────────────────────────

function wallPt(t) {
  return {
    x: (1-t)*(1-t)*WALL_L.x + 2*(1-t)*t*WALL_CP.x + t*t*WALL_R.x,
    y: (1-t)*(1-t)*WALL_L.y + 2*(1-t)*t*WALL_CP.y + t*t*WALL_R.y,
  };
}

const N_STRIPES = 16;
const MOW_STRIPES = Array.from({ length: N_STRIPES }, (_, i) => {
  const p1 = wallPt(i / N_STRIPES);
  const p2 = wallPt((i + 1) / N_STRIPES);
  return {
    d: `M ${HP.x},${HP.y} L ${p1.x.toFixed(1)},${p1.y.toFixed(1)} L ${p2.x.toFixed(1)},${p2.y.toFixed(1)} Z`,
    dark: i % 2 === 0,
  };
});

// ─── Ball arc ───────────────────────────────────────────────────────────────

function arcCP(start, end) {
  const dist = Math.hypot(end.x - start.x, end.y - start.y);
  const h = Math.min(dist * 0.45, 165);
  return { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 - h };
}

function arcPath(start, end) {
  const cp = arcCP(start, end);
  return `M ${start.x},${start.y} Q ${cp.x.toFixed(1)},${cp.y.toFixed(1)} ${end.x},${end.y}`;
}

// ─── Component ──────────────────────────────────────────────────────────────

function BaseRunnerDiagram({
  baseRunners,
  outs,
  ballLocation,
  onBallLocationSelect,
  isInteractive = false,
  selectedPosition,
}) {
  const [ballTarget, setBallTarget] = useState(null);
  const svgRef = useRef(null);
  const ballControls = useAnimation();
  const pathControls = useAnimation();
  const trailControls = useAnimation();

  useEffect(() => {
    if (ballLocation) {
      const mapped = toPersp(ballLocation);
      setBallTarget(mapped);
    } else if (isInteractive) {
      setBallTarget(HP);
    }
  }, [ballLocation, isInteractive]);

  // Orchestrated loop
  useEffect(() => {
    if (!ballTarget || isInteractive) return;
    let active = true;

    const cp = arcCP(HP, ballTarget);

    const loop = async () => {
      while (active) {
        ballControls.set({ x: 0, y: 0 });
        pathControls.set({ pathLength: 0 });
        trailControls.set({ opacity: 0 });

        await Promise.all([
          ballControls.start({
            x: [0, cp.x - HP.x, ballTarget.x - HP.x],
            y: [0, cp.y - HP.y, ballTarget.y - HP.y],
            transition: { duration: 0.65, times: [0, 0.4, 1], ease: 'easeOut' },
          }),
          pathControls.start({
            pathLength: 1,
            transition: { duration: 0.6, ease: 'easeOut' },
          }),
        ]);

        if (!active) break;
        await trailControls.start({ opacity: 1, transition: { duration: 0.15 } });
        await new Promise(r => setTimeout(r, 950));
        if (!active) break;
        await trailControls.start({ opacity: 0, transition: { duration: 0.2 } });
        await new Promise(r => setTimeout(r, 120));
      }
    };

    loop();
    return () => { active = false; };
  }, [ballTarget]);

  const handleClick = (e) => {
    if (!isInteractive) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 400;
    const py = ((e.clientY - rect.top) / rect.height) * 500;
    const perspPt = { x: Math.round(px), y: Math.round(py) };
    setBallTarget(perspPt);
    if (onBallLocationSelect) onBallLocationSelect(fromPersp(perspPt));
  };

  const trail = ballTarget ? arcPath(HP, ballTarget) : '';

  return (
    <div className="relative w-full max-w-xs mx-auto mb-4">
      <svg
        ref={svgRef}
        viewBox="0 0 400 500"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto drop-shadow-xl ${isInteractive ? 'cursor-crosshair' : ''}`}
        onClick={handleClick}
      >
        <defs>
          <linearGradient id="gcSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f0520" />
            <stop offset="35%"  stopColor="#6b2280" />
            <stop offset="72%"  stopColor="#d9621a" />
            <stop offset="100%" stopColor="#f0a030" />
          </linearGradient>
          <radialGradient id="gcHorizonGlow" cx="50%" cy="100%" r="55%">
            <stop offset="0%"   stopColor="#f5a623" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f5a623" stopOpacity="0"   />
          </radialGradient>
          <radialGradient id="gcDirtGrad" cx="50%" cy="40%" r="65%">
            <stop offset="0%"   stopColor="#ce9660" />
            <stop offset="100%" stopColor="#9e6838" />
          </radialGradient>
          <radialGradient id="gcInfieldGrass" cx="50%" cy="55%" r="55%">
            <stop offset="0%"   stopColor="#4db030" />
            <stop offset="100%" stopColor="#3a8a22" />
          </radialGradient>
          <filter id="gcBallShadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodOpacity="0.55" />
          </filter>
          <filter id="gcRunnerGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#60a5fa" floodOpacity="0.9" />
          </filter>
          <filter id="gcTextShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* ── Sky ────────────────────────────────────────────────────────── */}
        <rect x="0" y="0" width="400" height="500" fill="url(#gcSkyGrad)" />
        <rect x="0" y="0" width="400" height="500" fill="url(#gcHorizonGlow)" />

        {/* ── Stadium bleachers ─────────────────────────────────────────── */}
        {/* Center */}
        <rect x="148" y="36" width="104" height="46" rx="4" fill="#0a0818" opacity="0.88" />
        <rect x="155" y="41" width="18" height="37" fill="#0a0818" opacity="0.95" />
        <rect x="179" y="41" width="18" height="37" fill="#0a0818" opacity="0.95" />
        <rect x="205" y="41" width="18" height="37" fill="#0a0818" opacity="0.95" />
        <rect x="229" y="41" width="18" height="37" fill="#0a0818" opacity="0.95" />
        <rect x="196" y="25" width="4"  height="16" fill="#0a0818" opacity="0.95" />
        <rect x="208" y="22" width="4"  height="19" fill="#0a0818" opacity="0.95" />
        {/* Left */}
        <rect x="15"  y="58" width="86"  height="34" rx="3" fill="#0a0818" opacity="0.82" />
        <rect x="20"  y="63" width="14" height="25" fill="#0a0818" opacity="0.95" />
        <rect x="39"  y="63" width="14" height="25" fill="#0a0818" opacity="0.95" />
        <rect x="58"  y="63" width="14" height="25" fill="#0a0818" opacity="0.95" />
        <rect x="77"  y="63" width="14" height="25" fill="#0a0818" opacity="0.95" />
        <rect x="24"  y="44" width="3"  height="18" fill="#0a0818" opacity="0.95" />
        {/* Right */}
        <rect x="299" y="58" width="86"  height="34" rx="3" fill="#0a0818" opacity="0.82" />
        <rect x="303" y="63" width="14" height="25" fill="#0a0818" opacity="0.95" />
        <rect x="322" y="63" width="14" height="25" fill="#0a0818" opacity="0.95" />
        <rect x="341" y="63" width="14" height="25" fill="#0a0818" opacity="0.95" />
        <rect x="360" y="63" width="14" height="25" fill="#0a0818" opacity="0.95" />
        <rect x="373" y="44" width="3"  height="18" fill="#0a0818" opacity="0.95" />

        {/* ── Full fair-territory fill ───────────────────────────────────── */}
        <path
          d={`M ${HP.x},${HP.y} L ${WALL_L.x},${WALL_L.y} Q ${WALL_CP.x},${WALL_CP.y} ${WALL_R.x},${WALL_R.y} Z`}
          fill="#3a8a22"
        />

        {/* ── Mow stripes ───────────────────────────────────────────────── */}
        {MOW_STRIPES.map((s, i) => (
          <path key={i} d={s.d} fill={s.dark ? '#2e6e1a' : '#47a828'} />
        ))}

        {/* ── Warning track ─────────────────────────────────────────────── */}
        <path
          d={`M ${HP.x},${HP.y} L ${WALL_L.x},${WALL_L.y} Q ${WALL_CP.x},${WALL_CP.y} ${WALL_R.x},${WALL_R.y} Z`}
          fill="none"
          stroke="#b89060"
          strokeWidth="15"
        />

        {/* ── Outfield wall ─────────────────────────────────────────────── */}
        <path
          d={`M ${WALL_L.x},${WALL_L.y} Q ${WALL_CP.x},${WALL_CP.y} ${WALL_R.x},${WALL_R.y}`}
          fill="none" stroke="#165c16" strokeWidth="9"
        />
        <path
          d={`M ${WALL_L.x},${WALL_L.y} Q ${WALL_CP.x},${WALL_CP.y} ${WALL_R.x},${WALL_R.y}`}
          fill="none" stroke="#e8c030" strokeWidth="3"
        />

        {/* ── Foul lines ────────────────────────────────────────────────── */}
        <line x1={HP.x} y1={HP.y} x2={WALL_L.x} y2={WALL_L.y} stroke="white" strokeWidth="1.5" opacity="0.55" />
        <line x1={HP.x} y1={HP.y} x2={WALL_R.x} y2={WALL_R.y} stroke="white" strokeWidth="1.5" opacity="0.55" />

        {/* ── Infield dirt ──────────────────────────────────────────────── */}
        <path
          d={`
            M ${HP.x},${HP.y + 18}
            C ${BASE1.x + 32},${HP.y + 2}  ${BASE1.x + 36},${BASE1.y + 42} ${BASE1.x + 24},${BASE1.y}
            C ${BASE1.x + 12},${BASE2.y + 18} ${BASE2.x + 58},${BASE2.y - 6}  ${BASE2.x},${BASE2.y - 12}
            C ${BASE2.x - 58},${BASE2.y - 6} ${BASE3.x - 12},${BASE2.y + 18} ${BASE3.x - 24},${BASE3.y}
            C ${BASE3.x - 36},${BASE3.y + 42} ${HP.x - 32},${HP.y + 2}  ${HP.x},${HP.y + 18}
            Z
          `}
          fill="url(#gcDirtGrad)"
        />

        {/* ── Infield grass — small oval inside the base paths ─────────── */}
        <ellipse cx="200" cy="198" rx="68" ry="48" fill="url(#gcInfieldGrass)" />

        {/* ── Baselines ─────────────────────────────────────────────────── */}
        <line x1={HP.x}    y1={HP.y}    x2={BASE1.x} y2={BASE1.y} stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />
        <line x1={BASE1.x} y1={BASE1.y} x2={BASE2.x} y2={BASE2.y} stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />
        <line x1={BASE2.x} y1={BASE2.y} x2={BASE3.x} y2={BASE3.y} stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />
        <line x1={BASE3.x} y1={BASE3.y} x2={HP.x}    y2={HP.y}    stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />

        {/* ── Pitcher's mound ───────────────────────────────────────────── */}
        <ellipse cx={MOUND.x} cy={MOUND.y} rx="19" ry="12" fill="#ce9660" stroke="#9e6838" strokeWidth="1.5" />
        <rect x="193" y="223" width="14" height="4" rx="1" fill="white" opacity="0.9" />

        {/* ── Bases ─────────────────────────────────────────────────────── */}
        <rect x="192" y="140" width="16" height="16" transform={`rotate(45 ${BASE2.x} ${BASE2.y})`} fill="white" stroke="#ccc" strokeWidth="1" />
        <rect x="312" y="264" width="16" height="16" transform={`rotate(45 ${BASE1.x} ${BASE1.y})`} fill="white" stroke="#ccc" strokeWidth="1" />
        <rect x="72"  y="264" width="16" height="16" transform={`rotate(45 ${BASE3.x} ${BASE3.y})`} fill="white" stroke="#ccc" strokeWidth="1" />

        {/* ── Home plate ────────────────────────────────────────────────── */}
        <polygon
          points={`${HP.x},${HP.y + 14} ${HP.x + 13},${HP.y + 4} ${HP.x + 13},${HP.y - 10} ${HP.x - 13},${HP.y - 10} ${HP.x - 13},${HP.y + 4}`}
          fill="white" stroke="#ddd" strokeWidth="1"
        />
        <rect x="172" y="425" width="13" height="20" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
        <rect x="215" y="425" width="13" height="20" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />

        {/* ── Fielder labels ────────────────────────────────────────────── */}
        {!isInteractive && Object.entries(FIELDERS).map(([pos, { x, y }]) => {
          const isSelected = selectedPosition === pos;
          return (
            <g key={pos}>
              {isSelected && (
                <circle cx={x} cy={y} r="13" fill="#f59e0b" opacity="0.22" />
              )}
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize={isSelected ? 11 : 10}
                fontWeight="700"
                fill={isSelected ? '#fcd34d' : 'rgba(255,255,255,0.88)'}
                filter="url(#gcTextShadow)"
              >
                {pos}
              </text>
            </g>
          );
        })}

        {/* ── Base runners ──────────────────────────────────────────────── */}
        {baseRunners.first  && <circle cx={BASE1.x} cy={BASE1.y} r="10" fill="#3B82F6" stroke="white" strokeWidth="2" filter="url(#gcRunnerGlow)" />}
        {baseRunners.second && <circle cx={BASE2.x} cy={BASE2.y} r="10" fill="#3B82F6" stroke="white" strokeWidth="2" filter="url(#gcRunnerGlow)" />}
        {baseRunners.third  && <circle cx={BASE3.x} cy={BASE3.y} r="10" fill="#3B82F6" stroke="white" strokeWidth="2" filter="url(#gcRunnerGlow)" />}

        {/* ── Ball path + ball (animated) ───────────────────────────────── */}
        {ballTarget && !isInteractive && (
          <>
            {/* Drawing arc */}
            <motion.path
              d={trail}
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={pathControls}
              initial={{ pathLength: 0 }}
            />
            {/* Persistent trail */}
            <motion.path
              d={trail}
              stroke="rgba(255,255,255,0.82)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              animate={trailControls}
              initial={{ opacity: 0 }}
            />
            {/* Ball */}
            <motion.g animate={ballControls} initial={{ x: 0, y: 0 }}>
              <circle cx={HP.x} cy={HP.y} r="9.5" fill="white" filter="url(#gcBallShadow)" />
              {/* Red stitching */}
              <path d={`M ${HP.x-4},${HP.y-3} Q ${HP.x-1.5},${HP.y+1} ${HP.x-4},${HP.y+3}`}
                fill="none" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round" />
              <path d={`M ${HP.x+4},${HP.y-3} Q ${HP.x+1.5},${HP.y+1} ${HP.x+4},${HP.y+3}`}
                fill="none" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round" />
            </motion.g>
          </>
        )}

        {/* ── Static ball for interactive/creation mode ─────────────────── */}
        {ballTarget && isInteractive && (
          <g>
            <circle cx={ballTarget.x} cy={ballTarget.y} r="9.5" fill="white" filter="url(#gcBallShadow)" />
            <path d={`M ${ballTarget.x-4},${ballTarget.y-3} Q ${ballTarget.x-1.5},${ballTarget.y+1} ${ballTarget.x-4},${ballTarget.y+3}`}
              fill="none" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round" />
            <path d={`M ${ballTarget.x+4},${ballTarget.y-3} Q ${ballTarget.x+1.5},${ballTarget.y+1} ${ballTarget.x+4},${ballTarget.y+3}`}
              fill="none" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round" />
          </g>
        )}
      </svg>

      {/* ── Outs indicator ────────────────────────────────────────────────── */}
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md shadow">
        <div className="flex items-center space-x-1">
          <span className="text-gray-400 text-xs mr-1">OUT</span>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border ${
                i < outs ? 'bg-red-500 border-red-400' : 'bg-transparent border-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {isInteractive && (
        <p className="mt-2 text-center text-xs text-gray-500">
          Click anywhere on the field to place the ball
        </p>
      )}
    </div>
  );
}

export default BaseRunnerDiagram;
