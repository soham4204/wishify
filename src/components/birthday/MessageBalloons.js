// src/components/birthday/MessageBalloons.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { THEMES } from '../../constants/themes';

const MessageBalloons = ({ messages = [], themeId }) => {
  // Use default messages if none are provided
  const defaultMessages = [
    { id: 'd1', text: 'Wishing you the happiest of birthdays!' },
    { id: 'd2', text: 'Hope all your wishes come true!' },
    { id: 'd3', text: 'So glad to celebrate with you!' },
    { id: 'd4', text: 'To many more adventures!' },
    { id: 'd5', text: 'You are awesome!' },
  ];
  
  const displayMessages = messages.length > 0 ? messages : defaultMessages;
  const theme = THEMES[themeId] || THEMES.pastelDreams;

  // Track which balloons are popped
  const [poppedBalloons, setPoppedBalloons] = useState(new Set());
  const [notificationDismissed, setNotificationDismissed] = useState(false);

  const handlePop = (message) => {
    // FR-11.3: Reveal message
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full ${theme.bg} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
        >
          <p className={`text-lg font-semibold ${theme.text}`}>{message.text}</p>
        </div>
      ),
      { duration: 4000 }
    );

    // FR-11.4: Pop animation
    setPoppedBalloons((prev) => new Set(prev).add(message.id));
  };

  // FR-11.7: Reset balloons
  const resetBalloons = () => {
    setPoppedBalloons(new Set());
    setNotificationDismissed(false); // Show notification again when balloons reset
  };

  const allPopped = poppedBalloons.size === displayMessages.length;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {!allPopped && (
        <p className={`absolute top-24 left-1/2 -translate-x-1/2 text-lg ${theme.text} opacity-80 animate-pulse`}>
          Pop the balloons!
        </p>
      )}
      
      {/* --- Balloons --- */}
      {displayMessages.map((msg, index) => {
        const isPopped = poppedBalloons.has(msg.id);
        
        // Stagger positions and animations
        const positions = ['5%', '20%', '35%', '50%', '65%', '80%'];
        const delays = ['0s', '2s', '4s', '1s', '3s', '5s'];
        const balloonColor = theme.confetti[index % theme.confetti.length] || '#fbcfe8';

        return (
          <div
            key={msg.id}
            className={`balloon ${isPopped ? 'popped' : ''}`}
            style={{
              left: positions[index % positions.length],
              animationDelay: delays[index % delays.length],
              backgroundColor: balloonColor,
            }}
            onClick={() => handlePop(msg)}
          >
            🎈
          </div>
        );
      })}

      {/* --- Reset Notification --- */}
      {allPopped && !notificationDismissed && (
        <div className="absolute top-4 right-4 pointer-events-auto animate-slide-in-right">
          <div 
            className={`${theme.bg} shadow-2xl rounded-lg p-6 max-w-sm border-2`}
            style={{ borderColor: theme.confetti[1] }}
          >
            <div className="flex items-start justify-between mb-3">
              <p className={`text-xl font-bold ${theme.text}`}>
                🎉 All messages found!
              </p>
              <button
                onClick={() => setNotificationDismissed(true)}
                className={`${theme.text} opacity-60 hover:opacity-100 text-2xl leading-none ml-4`}
                aria-label="Close notification"
              >
                &times;
              </button>
            </div>
            <button
              onClick={resetBalloons}
              className={`w-full px-5 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all`}
              style={{ backgroundColor: theme.confetti[1] }}
            >
              Play Again 🎈
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBalloons;