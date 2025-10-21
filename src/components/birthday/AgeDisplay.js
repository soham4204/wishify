// src/components/birthday/AgeDisplay.js
import React from 'react';
import { motion } from 'framer-motion';

const AgeDisplay = ({ age, theme }) => {
  if (!age) {
    return null;
  }

  // Convert age to string to split into individual digits
  const digits = String(age).split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Animate each digit one after another
      },
    },
  };

  const digitVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.5, rotate: -90 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="flex justify-center items-center gap-2 my-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className={`text-4xl font-bold ${theme.text}`}>It's your</h2>
      {digits.map((digit, index) => (
        <motion.span
          key={index}
          className="text-8xl font-bold p-4 rounded-lg shadow-xl"
          style={{ 
            color: theme.text,
            backgroundColor: theme.confetti[index % theme.confetti.length],
          }}
          variants={digitVariants}
        >
          {digit}
        </motion.span>
      ))}
      <h2 className={`text-4xl font-bold ${theme.text}`}>!</h2>
    </motion.div>
  );
};

export default AgeDisplay;