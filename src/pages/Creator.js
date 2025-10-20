// src/pages/Creator.js
import React from 'react';
import NameInput from '../components/creator/NameInput';
import ImageUpload from '../components/creator/ImageUpload';
import ThemeSelector from '../components/creator/ThemeSelector';
import MusicSelector from '../components/creator/MusicSelector'; // 1. Import MusicSelector
import PublishLink from '../components/creator/PublishLink';
import { useCreatorStore } from '../hooks/useCreatorStore';

const Creator = () => {
  // 2. Get all state for the debug section
  const birthdayPersonName = useCreatorStore((state) => state.birthdayPersonName);
  const images = useCreatorStore((state) => state.images);
  const theme = useCreatorStore((state) => state.theme);
  const music = useCreatorStore((state) => state.music); // Get music state

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Create Your Birthday Wish
        </h1>
        
        {/* --- Step 1: Name Input --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <NameInput />
        </div>
        
        {/* --- Step 2: Image Upload --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <ImageUpload />
        </div>

        {/* --- Step 3: Theme Selection --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <ThemeSelector />
        </div>

        {/* --- Step 4: Music Selection (NEW) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <MusicSelector />
        </div>

        {/* --- Step 5: Publish (was Step 4) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <PublishLink />
        </div>

        {/* --- Debugging: Show current state (Optional) --- */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Current Data:</h3>
          <p>Name: {birthdayPersonName || "..."}</p>
          <p>Images: {images.length}</p>
          <p>Theme: {theme}</p>
          <p>Music: {music || 'None'}</p> {/* 4. Add music to debug */}
        </div>
      </div>
    </div>
  );
};

export default Creator;