# Glove Work — Product Roadmap

## Vision
The go-to baseball IQ training tool for youth players, coaches, and parents — making situational awareness fun to learn and easy to track.

---

## Who We're Building For

| User | Goal |
|------|------|
| **Player (8–14)** | Understand what to do in any game situation |
| **Parent** | Help their kid prepare between practices |
| **Coach** | Reinforce concepts taught at practice |

---

## Now — v1.1 Polish
**Timeline: 2–3 weeks**

Make what exists feel complete and trustworthy.

- **User accounts** (Supabase Auth — email or Google) — required to unlock leaderboard and progress
- **Progress tracking** — remember which scenarios a player has seen and how they scored
- **Scenario quality audit** — review all 55 scenarios for accuracy, difficulty balance, and age-appropriateness
- **Mobile feel** — test on real devices, fix any tap targets or scroll issues
- **`.env.example`** + deployment docs so the project is contributor-ready

---

## Next — v1.2 Engagement
**Timeline: 4–6 weeks**

Give players a reason to come back.

- **Streaks & XP** — daily practice streak, points per correct answer, level badges (Rookie → All-Star)
- **Score history** — per-session history graph so players can see improvement over time
- **Scenario difficulty tiers** — Beginner / Intermediate / Advanced, auto-selected based on performance
- **Position mastery %** — show how far along a player is for each position (e.g. "SS: 7/12 mastered")
- **Leaderboard** — now unblocked by auth; weekly + all-time boards

---

## Next — v1.3 Content Expansion
**Timeline: 4–6 weeks**

More scenarios = longer retention.

- **Expand scenario library** — target 30+ scenarios per position (currently thin on some positions)
- **Coach-submitted scenarios** — approve/reject queue for coach-created content (Create Scenario feature already built, just hidden)
- **Scenario categories** — tag scenarios by concept: cutoffs, rundowns, bunt defense, first-and-third, etc.
- **Video clips** — optional short clip attached to explanation showing the play in real game footage

---

## Later — v2.0 Team Features
**Timeline: Q3**

Expand from individual to team.

- **Team accounts** — coach creates a team, invites players via code
- **Coach dashboard** — see which concepts each player is struggling with, assign specific scenario sets
- **Practice plans** — coach assigns "homework" before a game (e.g. "review first-and-third scenarios before Saturday")
- **Team leaderboard** — friendly competition within a team

---

## Future — v3.0 Platform
**Timeline: Q4+**

Become the baseball IQ layer coaches rely on.

- **League integration** — GameChanger or TeamSnap connection to import roster
- **Pre-game prep mode** — scenarios specific to tonight's opponent's tendencies
- **Parent view** — parent can see child's progress without controlling the account
- **Offline mode** — PWA with cached scenarios for no-wifi dugout use
- **Multi-sport expansion** — softball as the natural first extension

---

## What We're Not Building

- Full stats tracking (that's GameChanger's job)
- Video streaming or practice film review
- Scheduling or team communication tools

---

## Key Metric to Watch

**Weekly Active Players** — if a player comes back 3+ days a week, the product is working. Everything on this roadmap should be evaluated against whether it drives repeat sessions.

---

## Foundation Dependency

The single most important unlock right now is **user accounts** — without identity, streaks don't mean anything, progress can't be tracked, and the leaderboard is a dead feature. That's the foundation everything else depends on.
