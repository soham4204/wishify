// src/pages/Creator.js
import React from 'react';
import NameInput from '../components/creator/NameInput';
import ImageUpload from '../components/creator/ImageUpload';
import ThemeSelector from '../components/creator/ThemeSelector';
import MusicSelector from '../components/creator/MusicSelector'; 
import PublishLink from '../components/creator/PublishLink';
import CustomMessageEditor from '../components/creator/CustomMessageEditor';
import { useCreatorStore } from '../hooks/useCreatorStore';
import MessageEditor from '../components/creator/MessageEditor';
import DateSelector from '../components/creator/DateSelector';
import AnalyticsToggle from '../components/creator/AnalyticsToggle';
import LayoutSelector from '../components/creator/LayoutSelector';
import VoiceMessageRecorder from '../components/creator/VoiceMessageRecorder';
import AgeInput from '../components/creator/AgeInput';
import PreviewButton from '../components/creator/PreviewButton';

const Creator = () => {
  // 2. Get all state for the debug section
  const birthdayPersonName = useCreatorStore((state) => state.birthdayPersonName);
  const images = useCreatorStore((state) => state.images);
  const theme = useCreatorStore((state) => state.theme);
  const music = useCreatorStore((state) => state.music); 
  const messages = useCreatorStore((state) => state.messages);
  const birthdayDate = useCreatorStore((state) => state.birthdayDate);
  const customMessage = useCreatorStore((state) => state.customMessage);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Create Your Birthday Wish
        </h1>
        
        {/* --- Step 1: Name Input --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <NameInput />
          <AgeInput />
        </div>
        
        {/* --- Step 2: Image Upload --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <ImageUpload />
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <LayoutSelector />
        </div>

        {/* --- Step 3: Theme Selection --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <ThemeSelector />
        </div>

        {/* --- Step 4: Music Selection (NEW) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <MusicSelector />
        </div>

        {/* --- Step 5: Balloon Messages (NEW) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <MessageEditor />
        </div>

        {/* --- Step 6: Countdown Timer (NEW) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <DateSelector />
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <CustomMessageEditor />
        </div>

        {/* --- Step 9: Voice Message (NEW) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <VoiceMessageRecorder />
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <AnalyticsToggle />
        </div>

        {/* --- Step 5: Publish (was Step 4) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <PreviewButton /> {/* 2. Add Preview button */}
            <PublishLink />
          </div>
        </div>

        {/* --- Debugging: Show current state (Optional) --- */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Current Data:</h3>
          <p>Name: {birthdayPersonName || "..."}</p>
          <p>Images: {images.length}</p>
          <p>Theme: {theme}</p>
          <p>Music: {music || 'None'}</p> 
          <p>Messages: {messages.length}</p>
          <p>Birthday Time: {birthdayDate ? birthdayDate.toString() : 'Not set'}</p>
          <p>Custom Message: {customMessage ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default Creator;