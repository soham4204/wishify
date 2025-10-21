// src/components/birthday/Countdown.js
import React from 'react';
import Countdown from 'react-countdown';
import { THEMES } from '../../constants/themes';

// This is the renderer for our timer (FR-12.3)
const CountdownRenderer = ({ days, hours, minutes, seconds, theme }) => (
  <div className="flex justify-center gap-4 text-center">
    <div className="p-6 bg-white bg-opacity-30 rounded-lg shadow-xl backdrop-blur-sm">
      <span className={`block text-6xl font-mono ${theme.text}`}>{days}</span>
      <span className={`block text-sm uppercase ${theme.text} opacity-80`}>Days</span>
    </div>
    <div className="p-6 bg-white bg-opacity-30 rounded-lg shadow-xl backdrop-blur-sm">
      <span className={`block text-6xl font-mono ${theme.text}`}>{hours}</span>
      <span className={`block text-sm uppercase ${theme.text} opacity-80`}>Hours</span>
    </div>
    <div className="p-6 bg-white bg-opacity-30 rounded-lg shadow-xl backdrop-blur-sm">
      <span className={`block text-6xl font-mono ${theme.text}`}>{minutes}</span>
      <span className={`block text-sm uppercase ${theme.text} opacity-80`}>Minutes</span>
    </div>
    <div className="p-6 bg-white bg-opacity-30 rounded-lg shadow-xl backdrop-blur-sm">
      <span className={`block text-6xl font-mono ${theme.text}`}>{seconds}</span>
      <span className={`block text-sm uppercase ${theme.text} opacity-80`}>Seconds</span>
    </div>
  </div>
);

const BirthdayCountdown = ({ name, targetDate, themeId, onComplete }) => {
  const theme = THEMES[themeId] || THEMES.pastelDreams;

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-8 
                  transition-colors duration-500 ${theme.bg}`}
    >
      <h1 className={`text-4xl font-bold text-center ${theme.text} mb-4`}>
        Get Ready, {name}!
      </h1>
      <p className={`text-2xl text-center ${theme.text} opacity-90 mb-12`}>
        Your celebration starts in...
      </p>
      
      <Countdown
        date={targetDate}
        onComplete={onComplete} // FR-12.4: Auto-transition
        renderer={(props) => <CountdownRenderer {...props} theme={theme} />}
      />
    </div>
  );
};

export default BirthdayCountdown;