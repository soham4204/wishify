// src/components/creator/MusicSelector.js
import React, { useState, useRef, useEffect } from 'react';
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
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Add Background Music (Optional)
      </label>
      <div className="flex flex-col space-y-2">
        {MUSIC_TRACKS.map((track) => (
          <label
            key={track.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all
                        ${selectedMusicId === track.id
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                          : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
          >
            <input
              type="radio"
              name="music-selection"
              className="form-radio h-5 w-5 text-blue-600"
              checked={selectedMusicId === track.id}
              onChange={() => handleSelect(track.id)} // Use new handler
            />
            <span className="ml-3 text-lg text-gray-700">{track.name}</span>
            
            {/* --- Preview Button --- */}
            <button
              type="button"
              onClick={(e) => handlePreview(e, track)}
              className="ml-auto px-3 py-1 rounded-full text-lg 
                         bg-gray-200 hover:bg-gray-300"
              aria-label={playingId === track.id ? "Pause preview" : "Play preview"}
            >
              {playingId === track.id ? '⏸️' : '▶️'}
            </button>
          </label>
        ))}
        
        {/* --- No Music Option --- */}
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all
                      ${!selectedMusicId
                        ? 'border-gray-400 bg-gray-100'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                      }`}
        >
          <input
            type="radio"
            name="music-selection"
            className="form-radio h-5 w-5 text-gray-600"
            checked={!selectedMusicId}
            onChange={() => handleSelect(null)} // Use new handler
          />
          <span className="ml-3 text-lg text-gray-700">No Music</span>
        </label>
      </div>
    </div>
  );
};

export default MusicSelector;