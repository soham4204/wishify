// src/components/birthday/MakeAWish.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// A single sparkle particle
const Sparkle = () => {
  // Randomize properties for each sparkle
  const size = Math.random() * 20 + 5;
  const duration = Math.random() * 1.5 + 0.5; // 0.5 to 2 seconds
  const delay = Math.random() * 1;
  const x = Math.random() * 200 - 100; // -100px to +100px
  const y = Math.random() * 200 - 100; // -100px to +100px
  const rotate = Math.random() * 360;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: '#FFD700', // Gold
        borderRadius: '50%',
        boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700',
        x,
        y,
        rotate,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }} // FR-21.3
      transition={{ duration, delay, repeat: Infinity, repeatDelay: 1 }}
    />
  );
};

const MakeAWish = ({ theme }) => {
  const [hasWished, setHasWished] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);

  const handleWish = () => {
    setHasWished(true); // FR-21.2
    
    // FR-21.4: Animation lasts 3-5 seconds. We'll stop it after 4s.
    setTimeout(() => {
      setShowInspiration(true); // FR-21.5
    }, 4000);
  };

  const inspirationalMessages = [
    "May all your dreams take flight!",
    "Here's to a year filled with joy and success!",
    "Go confidently in the direction of your dreams!",
    "Believe in the magic within you."
  ];
  
  // Pick a random message
  const [message] = useState(
    inspirationalMessages[Math.floor(Math.random() * inspirationalMessages.length)]
  );

  return (
    <div className="w-full flex flex-col items-center justify-center my-12 h-48">
      <AnimatePresence>
        {!hasWished && (
          <motion.button
            key="button"
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleWish}
            className={`px-8 py-4 ${theme.text} font-bold text-2xl rounded-lg shadow-lg
                        hover:opacity-90 transition-all`}
            style={{ backgroundColor: theme.confetti[1] || '#a5f3fc' }}
          >
            ✨ Make a Wish! ✨ 
          </motion.button>
        )}

        {hasWished && !showInspiration && (
          <motion.div
            key="sparkles"
            className="relative w-48 h-48 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Create 30 sparkle particles */}
            {[...Array(30)].map((_, i) => (
              <Sparkle key={i} />
            ))}
          </motion.div>
        )}
        
        {showInspiration && (
          <motion.p
            key="message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl font-bold ${theme.text} text-center`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MakeAWish;