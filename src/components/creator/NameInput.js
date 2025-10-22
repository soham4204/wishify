// src/components/creator/NameInput.js
import React from 'react';
import { motion } from 'framer-motion';
import { useCreatorStore } from '../../hooks/useCreatorStore';

const NameInput = () => {
  // Connect the component to the store
  const { birthdayPersonName, setBirthdayPersonName } = useCreatorStore();

  const handleChange = (e) => {
    // Enforce max length from FR-2.3 (1-50 chars)
    if (e.target.value.length <= 50) {
      setBirthdayPersonName(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <motion.label 
        htmlFor="birthday-name" 
        className="block text-xl font-semibold text-slate-800 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Who is this for?
      </motion.label>
      <motion.input
        type="text"
        id="birthday-name"
        value={birthdayPersonName}
        onChange={handleChange}
        placeholder="Enter the birthday person's name"
        className="input-field"
        required // FR-2.1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileFocus={{ scale: 1.02 }}
      />
      <motion.p 
        className="text-right text-sm text-slate-500 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {birthdayPersonName.length} / 50
      </motion.p>
    </div>
  );
};

export default NameInput;