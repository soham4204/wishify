// src/components/creator/NameInput.js
import React from 'react';
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
    <div className="w-full max-w-md mx-auto">
      <label 
        htmlFor="birthday-name" 
        className="block text-xl font-medium text-gray-800 mb-2"
      >
        Who is this for?
      </label>
      <input
        type="text"
        id="birthday-name"
        value={birthdayPersonName}
        onChange={handleChange}
        placeholder="Enter the birthday person's name"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required // FR-2.1
      />
      <p className="text-right text-sm text-gray-500 mt-1">
        {birthdayPersonName.length} / 50
      </p>
    </div>
  );
};

export default NameInput;