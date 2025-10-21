// src/components/creator/MusicSelector.js
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCreatorStore } from '../../hooks/useCreatorStore';
import { MUSIC_TRACKS } from '../../constants/music';

const MusicSelector = () => {
  const selectedMusicId = useCreatorStore((state) => state.music);
  const setMusic = useCreatorStore((state) => state.setMusic);

  // --- Audio Preview State ---
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(new Audio());

  // --- Stop music on unmount ---
  useEffect(() => {
    const audio = audioRef.current;
    // Add event listener to clear playing state when track finishes
    const onEnded = () => setPlayingId(null);
    audio.addEventListener('ended', onEnded);
    
    // Cleanup function
    return () => {
      audio.pause();
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const handlePreview = (e, track) => {
    e.stopPropagation(); // Prevent the label's onClick from firing
    const audio = audioRef.current;

    if (playingId === track.id) {
      // It's already playing, so pause it
      audio.pause();
      setPlayingId(null);
    } else {
      // Stop current track (if any) and play the new one
      audio.src = track.file;
      audio.play();
      setPlayingId(track.id);
    }
  };

  const handleSelect = (trackId) => {
    setMusic(trackId);
    
    // If user selects "No Music", stop the preview
    if (!trackId) {
      audioRef.current.pause();
      setPlayingId(null);
    }
  };

  return (
    <div className="w-full">
      <motion.label 
        className="block text-xl font-semibold text-slate-800 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Add Background Music (Optional)
      </motion.label>
      <div className="flex flex-col space-y-4">
        {MUSIC_TRACKS.map((track, index) => (
          <motion.label
            key={track.id}
            className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200
                        ${selectedMusicId === track.id
                          ? 'border-violet-500 bg-violet-100/50 ring-2 ring-violet-500'
                          : 'border-slate-200 bg-white/50 hover:bg-violet-50/30 hover:border-violet-300'
                        }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="radio"
              name="music-selection"
              className="form-radio h-5 w-5 text-violet-600"
              checked={selectedMusicId === track.id}
              onChange={() => handleSelect(track.id)}
            />
            <span className="ml-4 text-lg font-medium text-slate-700">{track.name}</span>
            
            {/* Enhanced Preview Button */}
            <motion.button
              type="button"
              onClick={(e) => handlePreview(e, track)}
              className="ml-auto px-4 py-2 rounded-lg text-lg font-medium
                         bg-slate-100 hover:bg-violet-100 text-slate-600 hover:text-violet-600
                         transition-all duration-200"
              aria-label={playingId === track.id ? "Pause preview" : "Play preview"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {playingId === track.id ? '⏸️' : '▶️'}
            </motion.button>
          </motion.label>
        ))}
        
        {/* Enhanced No Music Option */}
        <motion.label
          className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200
                      ${!selectedMusicId
                        ? 'border-slate-400 bg-slate-100/50 ring-2 ring-slate-400'
                        : 'border-slate-200 bg-white/50 hover:bg-slate-50/30 hover:border-slate-300'
                      }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * MUSIC_TRACKS.length }}
          whileHover={{ scale: 1.02 }}
        >
          <input
            type="radio"
            name="music-selection"
            className="form-radio h-5 w-5 text-slate-600"
            checked={!selectedMusicId}
            onChange={() => handleSelect(null)}
          />
          <span className="ml-4 text-lg font-medium text-slate-700">No Music</span>
        </motion.label>
      </div>
    </div>
  );
};

export default MusicSelector;