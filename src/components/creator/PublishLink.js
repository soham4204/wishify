// src/components/creator/PublishLink.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreatorStore } from '../../hooks/useCreatorStore';
import { generateUniqueId, createBirthdayPage } from '../../services/firestore';
import toast from 'react-hot-toast';

const PublishLink = () => {
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(null);

  // Get all data from the store
  const creatorData = useCreatorStore((state) => state);

  const handleGenerateLink = async () => {
    // Validate required fields (FR-2.1)
    if (!creatorData.birthdayPersonName) {
      toast.error("Please enter the birthday person's name!");
      return;
    }

    setLoading(true);
    try {
      const uniqueId = await generateUniqueId();
      await createBirthdayPage(uniqueId, creatorData);
      
      const link = `${window.location.origin}/${uniqueId}`; // FR-1.2
      setGeneratedLink(link);
      toast.success("Your link is ready!");
    } catch (error) {
      console.error("Error creating page:", error);
      toast.error("Could not create link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copied to clipboard!"); // FR-1.5: Visual feedback
  };

  if (generatedLink) {
    return (
      <motion.div 
        className="w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-3xl font-display text-violet-700 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Link Created! 🎉
        </motion.h2>
        <p className="mb-6 text-slate-600 font-medium">Share this link with the birthday person:</p>
        <motion.div 
          className="flex w-full max-w-lg mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            readOnly
            value={generatedLink}
            className="flex-grow p-4 border border-slate-200 rounded-l-xl bg-white/50 backdrop-blur-sm focus:outline-none text-slate-600"
          />
          <motion.button
            onClick={handleCopyLink}
            className="px-6 py-4 bg-violet-600 text-white font-semibold rounded-r-xl hover:bg-violet-700 focus:outline-none transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Copy
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.button
        onClick={handleGenerateLink}
        disabled={loading}
        className="btn-primary px-8 py-4 text-lg font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed"
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Generating...</span>
          </div>
        ) : (
          '✨ Generate Your Link'
        )}
      </motion.button>
    </motion.div>
  );
};

export default PublishLink;