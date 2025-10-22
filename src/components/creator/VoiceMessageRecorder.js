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
      {/* Header */}
      <div className="mb-6">
        <label className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-3xl">🎙️</span>
          Add a Voice Message
          <span className="text-sm font-normal text-gray-400 ml-2">(Optional)</span>
        </label>
        <div className="flex items-start gap-2 bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
          <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-gray-700 leading-relaxed">
            Record a personal voice message for the birthday celebrant. Maximum duration is 60 seconds.
          </p>
        </div>
      </div>
      
      {/* State 1: Already Saved */}
      {voiceMessage && !isUploading && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-green-800">Voice Message Saved!</p>
                <p className="text-sm text-green-600">Your audio is ready to share</p>
              </div>
            </div>
            <button 
              onClick={handleClear} 
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg
                       hover:bg-red-600 transition-all duration-200 hover:shadow-lg
                       flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      )}
      
      {/* State 2: Uploading */}
      {isUploading && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <svg className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-800 mb-1">Uploading Audio...</p>
              <p className="text-sm text-blue-600">Please wait while we save your voice message</p>
            </div>
          </div>
        </div>
      )}

      {/* State 3: Ready to Record / Recording */}
      {!voiceMessage && !audioURL && !isUploading && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-all">
          <div className="flex flex-col items-center gap-6">
            <div className={`relative ${isRecording ? 'animate-pulse' : ''}`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center
                            ${isRecording ? 'bg-red-500' : 'bg-gradient-to-br from-pink-500 to-purple-600'}`}>
                {isRecording ? (
                  <div className="w-8 h-8 bg-white rounded-sm"></div>
                ) : (
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {isRecording && (
                <div className="absolute -inset-2 border-4 border-red-300 rounded-full animate-ping"></div>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isRecording ? 'Recording in Progress' : 'Ready to Record'}
              </h3>
              <p className="text-gray-600">
                {isRecording ? 'Click stop when you\'re done (Max 60s)' : 'Click the button below to start recording'}
              </p>
            </div>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-8 py-4 text-white font-bold rounded-xl shadow-lg
                        transition-all duration-200 transform hover:scale-105
                        ${isRecording 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                          : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'}`}
            >
              {isRecording ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-white rounded-sm"></span>
                  Stop Recording
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Start Recording (Max 60s)
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* State 4: Preview & Upload */}
      {audioURL && !voiceMessage && !isUploading && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900">Preview Your Recording</p>
              <p className="text-sm text-gray-600">Listen before saving</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <audio 
              src={audioURL} 
              controls 
              className="w-full h-12"
              style={{ outline: 'none' }}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <button 
              onClick={handleUpload} 
              className="flex-1 min-w-[140px] px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                       text-white font-bold rounded-lg shadow-md
                       hover:from-green-600 hover:to-emerald-700 transition-all duration-200
                       flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Message
            </button>
            <button 
              onClick={handleClear} 
              className="flex-1 min-w-[140px] px-6 py-3 bg-gray-500 text-white font-bold rounded-lg
                       hover:bg-gray-600 transition-all duration-200
                       flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Record Again
            </button>
          </div>
        </div>
      )}

      {/* Custom Audio Player Styles */}
      <style jsx>{`
        audio::-webkit-media-controls-panel {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default VoiceMessageRecorder;