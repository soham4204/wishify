// src/components/creator/AgeInput.js
import React from 'react';
import { motion } from 'framer-motion';
import { useCreatorStore } from '../../hooks/useCreatorStore';

const AgeInput = () => {
  const age = useCreatorStore((state) => state.age);
  const setAge = useCreatorStore((state) => state.setAge);

  return (
    <div className="w-full">
      <motion.label 
        className="block text-xl font-semibold text-slate-800 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Add Age (Optional)
      </motion.label>
      <motion.p 
        className="text-sm text-slate-500 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        If you add an age, it will be shown in a fun animation.
      </motion.p>
      <motion.input
        type="number"
        min="1"
        max="150"
        value={age || ''}
        onChange={(e) => setAge(e.target.value)}
        placeholder="e.g., 30"
        className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileFocus={{ scale: 1.02 }}
      />
    </div>
  );
};

export default AgeInput;