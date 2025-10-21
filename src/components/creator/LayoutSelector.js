// src/components/creator/LayoutSelector.js
import React from 'react';
import { motion } from 'framer-motion';
import { useCreatorStore } from '../../hooks/useCreatorStore';

const LayoutSelector = () => {
  const photoLayout = useCreatorStore((state) => state.photoLayout);
  const setPhotoLayout = useCreatorStore((state) => state.setPhotoLayout);

  return (
    <div className="w-full">
      <motion.label 
        className="block text-xl font-semibold text-slate-800 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Photo Layout
      </motion.label>
      <div className="flex gap-6">
        {/* Enhanced Carousel Option */}
        <motion.label
          className={`flex-1 p-6 border-2 rounded-xl cursor-pointer text-center transition-all duration-200
                      ${photoLayout === 'carousel' ? 'border-violet-500 bg-violet-100/50 ring-2 ring-violet-500' : 'border-slate-200 hover:border-violet-300 hover:bg-violet-50/30'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <input
            type="radio"
            name="layout"
            value="carousel"
            checked={photoLayout === 'carousel'}
            onChange={() => setPhotoLayout('carousel')}
            className="sr-only"
          />
          <div className="space-y-3">
            <span className="text-4xl">🎠</span>
            <span className="block font-semibold text-slate-700">Carousel</span>
            <p className="text-sm text-slate-500">Swipe through photos</p>
          </div>
        </motion.label>
        
        {/* Enhanced Timeline Option */}
        <motion.label
          className={`flex-1 p-6 border-2 rounded-xl cursor-pointer text-center transition-all duration-200
                      ${photoLayout === 'timeline' ? 'border-violet-500 bg-violet-100/50 ring-2 ring-violet-500' : 'border-slate-200 hover:border-violet-300 hover:bg-violet-50/30'}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <input
            type="radio"
            name="layout"
            value="timeline"
            checked={photoLayout === 'timeline'}
            onChange={() => setPhotoLayout('timeline')}
            className="sr-only"
          />
          <div className="space-y-3">
            <span className="text-4xl">🗓️</span>
            <span className="block font-semibold text-slate-700">Timeline</span>
            <p className="text-sm text-slate-500">Chronological story</p>
          </div>
        </motion.label>
      </div>
    </div>
  );
};

export default LayoutSelector;