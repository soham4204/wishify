// src/components/creator/VoiceMessageRecorder.js
import React, { useState, useRef } from 'react';
import { useCreatorStore } from '../../hooks/useCreatorStore';
import { uploadAudio } from '../../services/cloudinary';
import toast from 'react-hot-toast';

const VoiceMessageRecorder = () => {
  const { voiceMessage, setVoiceMessage, removeVoiceMessage } = useCreatorStore();
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast("Recording... (Max 60s)");
      
      // FR-19.2: Stop after 60 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          stopRecording();
          toast("Recording limit reached.");
        }
      }, 60000);

    } catch (err) {
      console.error("Microphone permission denied:", err);
      toast.error("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleUpload = async () => {
    if (!audioBlob) return;
    setIsUploading(true);
    try {
      const { url } = await uploadAudio(audioBlob);
      setVoiceMessage(url);
      setAudioURL(null);
      setAudioBlob(null);
      toast.success("Voice message saved!");
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setAudioURL(null);
    setAudioBlob(null);
    if (voiceMessage) {
      removeVoiceMessage();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Add a Voice Message (Optional)
      </label>
      
      {/* State 1: Already Saved */}
      {voiceMessage && !isUploading && (
        <div className="flex items-center gap-4">
          <p className="text-green-700 font-semibold">✅ Voice message saved!</p>
          <button onClick={handleClear} className="text-red-500 hover:text-red-700">
            Remove
          </button>
        </div>
      )}
      
      {/* State 2: Uploading */}
      {isUploading && (
        <p className="font-semibold text-blue-600 animate-pulse">Uploading audio...</p>
      )}

      {/* State 3: Ready to Record / Recording */}
      {!voiceMessage && !audioURL && !isUploading && (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md
                      ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording (Max 60s)'}
        </button>
      )}

      {/* State 4: Preview & Upload (FR-19.4) */}
      {audioURL && !voiceMessage && !isUploading && (
        <div className="space-y-4">
          <audio src={audioURL} controls className="w-full" />
          <div className="flex gap-4">
            <button onClick={handleUpload} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg">
              Save Message
            </button>
            <button onClick={handleClear} className="px-6 py-2 bg-gray-500 text-white rounded-lg">
              Record Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceMessageRecorder;