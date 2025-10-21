// src/components/creator/ThemeSelector.js
import React from 'react';
import { motion } from 'framer-motion';
import { useCreatorStore } from '../../hooks/useCreatorStore';
import { THEMES } from '../../constants/themes';

const ThemeSelector = () => {
  const selectedThemeId = useCreatorStore((state) => state.theme);
  const setTheme = useCreatorStore((state) => state.setTheme);

  // Convert object → array
  const themeArray = Object.values(THEMES);

  return (
    <div className="w-full">
      <motion.label 
        className="block text-xl font-semibold text-slate-800 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Choose a Theme
      </motion.label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {themeArray.map((theme, index) => (
          <ThemeOption
            key={theme.id}
            theme={theme}
            isSelected={selectedThemeId === theme.id}
            onClick={() => setTheme(theme.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const ThemeOption = ({ theme, isSelected, onClick, index }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`w-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
        ${isSelected ? 'border-violet-500 bg-violet-100/50 ring-2 ring-violet-500' : 'border-slate-200 hover:border-violet-300 hover:bg-violet-50/30'}
        focus:outline-none focus:ring-2 focus:ring-violet-500`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Enhanced visual preview */}
      <div className={`w-full h-20 rounded-lg flex overflow-hidden mb-3 shadow-md ${theme.bg}`}></div>
      <p className={`text-center font-semibold ${theme.text}`}>{theme.name}</p>
    </motion.button>
  );
};

export default ThemeSelector;
