// src/components/creator/PublishLink.js
import React, { useState } from 'react';
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
      <div className="w-full text-center">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          🎉 Link Created! 🎉
        </h2>
        <p className="mb-4">Share this link with the birthday person:</p>
        <div className="flex w-full max-w-lg mx-auto">
          <input
            type="text"
            readOnly
            value={generatedLink}
            className="flex-grow p-3 border border-gray-300 rounded-l-lg bg-gray-50 focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 focus:outline-none"
          >
            Copy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-center">
      <button
        onClick={handleGenerateLink}
        disabled={loading}
        className="px-10 py-4 bg-green-600 text-white text-xl font-bold rounded-lg shadow-lg 
                   hover:bg-green-700 transition-colors
                   disabled:bg-gray-400 disabled:animate-pulse"
      >
        {loading ? "Generating..." : "Generate Your Link"}
      </button>
    </div>
  );
};

export default PublishLink;