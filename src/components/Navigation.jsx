import { useState } from 'react';

const Navigation = ({ activeView, setActiveView, onResetProgress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Navigation Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-16 px-4 pb-8">
          <nav className="space-y-2">
            <button
              onClick={() => handleNavClick('practice')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeView === 'practice'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100 font-medium'
              }`}
            >
              Practice
            </button>
            <button
              onClick={() => handleNavClick('create')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeView === 'create'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100 font-medium'
              }`}
            >
              Create Scenario
            </button>
            <button
              onClick={() => handleNavClick('leaderboard')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeView === 'leaderboard'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100 font-medium'
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => handleNavClick('rules')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeView === 'rules'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100 font-medium'
              }`}
            >
              Rules
            </button>
            {onResetProgress && ( // Conditionally render if the prop is provided
              <div className="mt-4 pt-4 border-t border-gray-200"> {/* Visual separator */}
                <button
                  onClick={() => {
                    onResetProgress();
                    setIsOpen(false); // Close the menu
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-white bg-red-500 hover:bg-red-600 font-medium transition-colors" // Destructive action styling
                >
                  Reset Progress
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default Navigation; 