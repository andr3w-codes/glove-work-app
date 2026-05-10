import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'practice', label: '⚾ Practice'        },
  { id: 'rules',    label: '📖 Rules Assistant' },
];

const Navigation = ({ activeView, setActiveView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger trigger — sits inline in the header, no fixed positioning */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className="block w-full h-0.5 bg-gray-200 rounded" />
          <span className="block w-full h-0.5 bg-gray-200 rounded" />
          <span className="block w-full h-0.5 bg-gray-200 rounded" />
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 h-full w-64 bg-[#23232a] border-l border-[#333642] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#333642]">
          <span className="text-gray-200 font-semibold text-sm uppercase tracking-widest">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                activeView === id
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
