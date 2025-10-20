// src/components/creator/ThemeSelector.js
import React from 'react';
import { useCreatorStore } from '../../hooks/useCreatorStore';
import { THEMES } from '../../constants/themes';

const ThemeSelector = () => {
  const selectedThemeId = useCreatorStore((state) => state.theme);
  const setTheme = useCreatorStore((state) => state.setTheme);

  // Convert object → array
  const themeArray = Object.values(THEMES);

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Choose a Theme
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {themeArray.map((theme) => (
          <ThemeOption
            key={theme.id}
            theme={theme}
            isSelected={selectedThemeId === theme.id}
            onClick={() => setTheme(theme.id)}
          />
        ))}
      </div>
    </div>
  );
};

const ThemeOption = ({ theme, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-2 border-2 rounded-lg cursor-pointer
        ${isSelected ? 'border-blue-600 ring-2 ring-blue-500' : 'border-gray-300 hover:border-gray-400'}
        focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      {/* Visual preview */}
      <div className={`w-full h-20 rounded-md flex overflow-hidden mb-2 ${theme.bg}`}></div>
      <p className={`text-center font-medium ${theme.text}`}>{theme.name}</p>
    </button>
  );
};

export default ThemeSelector;
