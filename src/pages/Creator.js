// src/pages/Creator.js
import React from 'react';
import { motion } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <div className="max-w-4xl mx-auto py-12 px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display text-slate-800 mb-4">
            Create Your Birthday Wish
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Craft a magical celebration that will be remembered forever
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* --- Step 1: Name Input --- */}
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <NameInput />
            <AgeInput />
          </motion.div>
          
          {/* --- Step 2: Image Upload --- */}
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <ImageUpload />
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8">
            <LayoutSelector />
          </motion.div>

          {/* --- Step 3: Theme Selection --- */}
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <ThemeSelector />
          </motion.div>

          {/* --- Step 4: Music Selection --- */}
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <MusicSelector />
          </motion.div>

          {/* --- Step 5: Balloon Messages --- */}
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <MessageEditor />
          </motion.div>

          {/* --- Step 6: Countdown Timer --- */}
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <DateSelector />
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8">
            <CustomMessageEditor />
          </motion.div>

          {/* --- Step 9: Voice Message --- */}
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <VoiceMessageRecorder />
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8">
            <AnalyticsToggle />
          </motion.div>

          {/* --- Final Step: Publish --- */}
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <PreviewButton />
              <PublishLink />
            </div>
          </motion.div>

          {/* --- Debugging: Show current state (Optional) --- */}
          <motion.div variants={itemVariants} className="glass-panel p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Current Data:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-600">
              <p><span className="font-medium">Name:</span> {birthdayPersonName || "..."}</p>
              <p><span className="font-medium">Images:</span> {images.length}</p>
              <p><span className="font-medium">Theme:</span> {theme}</p>
              <p><span className="font-medium">Music:</span> {music || 'None'}</p> 
              <p><span className="font-medium">Messages:</span> {messages.length}</p>
              <p><span className="font-medium">Birthday Time:</span> {birthdayDate ? birthdayDate.toString() : 'Not set'}</p>
              <p><span className="font-medium">Custom Message:</span> {customMessage ? 'Yes' : 'No'}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Creator;