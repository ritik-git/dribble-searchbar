import React from 'react';
import SearchDropdown from './components/SearchDropdown';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {/* Dribbble-Style Search */}
          </h1>
          <p className="text-gray-600 text-lg">
            A glassmorphic search dropdown with smooth animations
          </p>
        </div>
        <SearchDropdown />
      </div>
    </div>
  );
}

export default App;
