// src/components/birthday/DigitalCake.js
import React, { useState, useEffect } from 'react';
import { useMicBlow } from '../../hooks/useMicBlow';
import toast from 'react-hot-toast';

const DigitalCake = () => {
  const [areCandlesLit, setAreCandlesLit] = useState(true);

  const blowOut = () => {
    if (areCandlesLit) {
      setAreCandlesLit(false);
      stopListening(); // Stop the mic hook
      // FR-7.5: Trigger celebration
      toast.success("Make a wish!", { duration: 4000 });
    }
  };

  // Setup the mic hook
  const { isListening, error, startListening, stopListening } = useMicBlow(blowOut);

  // FR-7.2: Click/tap to blow
  const handleCandleClick = () => {
    blowOut();
  };
  
  // Show a toast if mic access fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8">
      {/* --- The Cake --- */}
      <div className="cake">
        {/* We'll just use 3 candles for simplicity */}
        <div 
          className="candle" 
          style={{ left: '25%' }} 
          onClick={handleCandleClick}
        >
          <div className={`flame ${!areCandlesLit ? 'flame-out' : ''}`}></div>
        </div>
        <div 
          className="candle" 
          style={{ left: '45%' }} 
          onClick={handleCandleClick}
        >
          <div className={`flame ${!areCandlesLit ? 'flame-out' : ''}`}></div>
        </div>
        <div 
          className="candle" 
          style={{ left: '65%' }} 
          onClick={handleCandleClick}
        >
          <div className={`flame ${!areCandlesLit ? 'flame-out' : ''}`}></div>
        </div>
      </div>

      {/* --- Instructions / Celebration --- */}
      <div className="mt-8 text-center h-16">
        {areCandlesLit && !isListening && (
          <button
            onClick={startListening}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Try Blowing! (Needs Mic)
          </button>
        )}
        {areCandlesLit && isListening && (
          <p className="text-xl font-semibold animate-pulse text-blue-700">
            Listening... Try blowing on your mic!
          </p>
        )}
        {areCandlesLit && !isListening && (
           <p className="text-gray-600 mt-2">
            (You can also just click the candles)
           </p>
        )}
        {!areCandlesLit && (
          <p className="text-3xl font-bold text-pink-600 animate-bounce">
            🎉 Wish Come True! 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default DigitalCake;