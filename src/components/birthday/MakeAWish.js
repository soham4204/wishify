// src/components/birthday/MakeAWish.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced sparkle particle
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
        background: 'radial-gradient(circle, #FFD700, #FFA500)',
        borderRadius: '50%',
        boxShadow: '0 0 15px #FFD700, 0 0 30px #FFD700, 0 0 45px #FFD700',
        x,
        y,
        rotate,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1.2, 0],
        rotate: [0, 360]
      }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: 1 }}
    />
  );
};

const MakeAWish = ({ theme }) => {
  const [hasWished, setHasWished] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);

  const handleWish = () => {
    setHasWished(true);
    
    // Animation lasts 3-5 seconds. We'll stop it after 4s.
    setTimeout(() => {
      setShowInspiration(true);
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
    <motion.div 
      className="w-full flex flex-col items-center justify-center my-16 h-64"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence>
        {!hasWished && (
          <motion.button
            key="button"
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleWish}
            className="px-12 py-6 bg-pink-600 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
          >
            ✨ Make a Wish! ✨ 
          </motion.button>
        )}

        {hasWished && !showInspiration && (
          <motion.div
            key="sparkles"
            className="relative w-64 h-64 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Create 40 enhanced sparkle particles */}
            {[...Array(40)].map((_, i) => (
              <Sparkle key={i} />
            ))}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-yellow-300 opacity-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
        
        {showInspiration && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl"
          >
            <motion.p
              className="text-4xl font-display text-slate-800 mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MakeAWish;