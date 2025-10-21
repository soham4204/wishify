// src/components/creator/AgeInput.js
import React from 'react';
import { useCreatorStore } from '../../hooks/useCreatorStore';

const AgeInput = () => {
  const age = useCreatorStore((state) => state.age);
  const setAge = useCreatorStore((state) => state.setAge);

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Add Age (Optional)
      </label>
      <p className="text-sm text-gray-500 mb-2">
        If you add an age, it will be shown in a fun animation.
      </p>
      <input
        type="number"
        min="1"
        max="150"
        value={age || ''}
        onChange={(e) => setAge(e.target.value)}
        placeholder="e.g., 30"
        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default AgeInput;