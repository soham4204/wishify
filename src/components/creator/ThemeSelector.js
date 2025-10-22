// src/components/creator/ThemeSelector.js
import React from 'react';
import { motion } from 'framer-motion';
import { useCreatorStore } from '../../hooks/useCreatorStore';
import { THEMES } from '../../constants/themes';

const ThemeSelector = () => {
  const selectedThemeId = useCreatorStore((state) => state.theme);
  const setTheme = useCreatorStore((state) => state.setTheme);

  const themeArray = Object.values(THEMES);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6">
        <motion.label 
          className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-3xl">🎨</span>
          Choose a Theme
        </motion.label>
        <motion.div 
          className="flex items-start gap-2 bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-400 p-4 rounded-r-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
          <p className="text-sm text-gray-700 leading-relaxed">
            Select a color theme that matches the birthday vibe. Each theme sets the background, text colors, and overall aesthetic.
          </p>
        </motion.div>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Selected Theme Info */}
      {selectedThemeId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 border-2 border-violet-200 rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="bg-violet-500 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide">Current Theme</p>
              <p className="text-lg font-bold text-gray-900">
                {THEMES[selectedThemeId]?.name || 'None'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const ThemeOption = ({ theme, isSelected, onClick, index }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative w-full overflow-hidden rounded-xl transition-all duration-300
        ${isSelected 
          ? 'ring-4 ring-violet-500 ring-offset-2 shadow-xl' 
          : 'ring-2 ring-gray-200 hover:ring-violet-300 hover:shadow-lg'
        }
        focus:outline-none focus:ring-4 focus:ring-violet-400`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Theme Preview Background */}
      <div className={`w-full h-32 ${theme.bg} relative overflow-hidden`}>
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white"></div>
          <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white"></div>
        </div>

        {/* Sample Text Preview */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className={`text-2xl font-bold mb-1 ${theme.text}`}>
            Aa
          </div>
          <div className={`text-xs ${theme.text} opacity-75`}>
            Preview
          </div>
        </div>

        {/* Selected Checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 bg-violet-500 rounded-full p-1.5 shadow-lg"
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Theme Name Label */}
      <div className={`p-3 bg-white border-t-2 ${isSelected ? 'border-violet-500' : 'border-gray-200'}`}>
        <p className={`text-center font-bold text-sm ${isSelected ? 'text-violet-600' : 'text-gray-700'}`}>
          {theme.name}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/0 via-violet-500/0 to-violet-500/0 
                    group-hover:from-violet-500/5 group-hover:via-violet-500/10 group-hover:to-violet-500/5 
                    transition-all duration-300 pointer-events-none"></div>
    </motion.button>
  );
};

export default ThemeSelector;