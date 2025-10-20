// src/hooks/useMicBlow.js
import { useState, useEffect, useRef } from 'react';

// This is the threshold to detect a "blow"
const BLOW_THRESHOLD = 60; 

export const useMicBlow = (onBlow) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setIsListening(false);
  };

  const processAudio = () => {
    if (!analyserRef.current) return;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    dataArray.forEach((value) => (sum += value));
    const average = sum / bufferLength;

    if (average > BLOW_THRESHOLD) {
      // --- THIS IS THE FIX ---
      // Stop the mic hook *first* to prevent this from firing again.
      stopListening();
      // Then, call the callback *once*.
      onBlow();
      // --- END FIX ---
    } else {
      // Only continue the loop if we *haven't* detected a blow
      animationFrameRef.current = requestAnimationFrame(processAudio);
    }
  };

  const startListening = async () => {
    // FR-7.6: Request permission
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      setIsListening(true);
      setError(null);
      processAudio();
    } catch (err) {
      console.error("Microphone access denied:", err);
      setError("Microphone access denied. You can still click the candles!");
      setIsListening(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopListening();
  }, []);

  return { isListening, error, startListening, stopListening };
};