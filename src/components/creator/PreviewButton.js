// src/components/creator/PreviewButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatorStore } from '../../hooks/useCreatorStore';
import toast from 'react-hot-toast';

const PreviewButton = () => {
  const navigate = useNavigate();
  // 1. Get the *entire* current state
  const currentState = useCreatorStore.getState();

  const handlePreview = () => {
    // 2. Check for a name first
    if (!currentState.birthdayPersonName) {
      toast.error("Please enter a name first!");
      return;
    }

    // 3. Format the data to *exactly* match the Firebase structure
    // This is crucial so BirthdayPage can read it
    const previewData = {
      id: 'preview',
      createdAt: new Date(), // Use a temporary date
      birthdayPersonName: currentState.birthdayPersonName,
      theme: currentState.theme,
      images: currentState.images,
      photoLayout: currentState.photoLayout,
      messages: currentState.messages,
      voiceMessage: currentState.voiceMessage,
      customMessage: currentState.customMessage,
      viewCount: 1, // Show a fake view count
      settings: {
        music: currentState.music,
        birthdayDate: currentState.birthdayDate,
        age: currentState.age,
        showViewCount: currentState.showViewCount,
      }
    };

    // 4. Navigate to /preview and pass the data in 'state'
    navigate('/preview', { state: { previewData } });
  };

  return (
    <button
      onClick={handlePreview}
      className="px-10 py-4 bg-gray-600 text-white text-xl font-bold rounded-lg shadow-lg 
                 hover:bg-gray-700 transition-colors"
    >
      Preview
    </button>
  );
};

export default PreviewButton;