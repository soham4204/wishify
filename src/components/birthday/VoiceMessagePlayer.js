// src/components/birthday/VoiceMessagePlayer.js
import React from 'react';

const VoiceMessagePlayer = ({ url, theme }) => {
  if (!url) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <h2 className={`text-3xl font-bold mb-4 ${theme.text} text-center`}>
        A Voice Message For You!
      </h2>
      <audio
        controls
        src={url}
        // FR-19.6: Autoplay is unreliable. We'll add 'controls' and let the user play.
        // Browsers block autoplay with audio.
        className="w-full"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default VoiceMessagePlayer;