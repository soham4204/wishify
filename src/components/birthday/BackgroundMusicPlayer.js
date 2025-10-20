// src/components/birthday/BackgroundMusicPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import { MUSIC_TRACKS } from '../../constants/music';

const BackgroundMusicPlayer = ({ musicId }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const track = MUSIC_TRACKS.find(t => t.id === musicId);

  useEffect(() => {
    if (audioRef.current) {
      // Set the audio source
      audioRef.current.src = track.file;
      audioRef.current.loop = true; // FR-10.5: Loop music

      // FR-10.2 & 10.6: Attempt to autoplay
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            // Autoplay was prevented.
            // We'll rely on the user to click "play" or interact.
            console.warn("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [track]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const attemptPlay = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Could not play audio:", e));
    }
  };

  if (!track) return null; // No music selected

  return (
    <div 
      className="fixed bottom-4 right-4 z-50"
      onClick={attemptPlay} // Click anywhere on page to start
    >
      <audio ref={audioRef} />
      <button
        onClick={toggleMute}
        className="w-12 h-12 bg-black bg-opacity-50 text-white rounded-full 
                   flex items-center justify-center shadow-lg backdrop-blur-sm
                   hover:bg-opacity-70 transition-all"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {/* FR-10.3: Mute toggle */}
        {isMuted ? '🔇' : '🎵'}
      </button>
    </div>
  );
};

export default BackgroundMusicPlayer;