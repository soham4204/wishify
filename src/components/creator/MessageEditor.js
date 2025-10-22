// src/components/creator/MessageEditor.js
import React, { useState } from 'react';
import { useCreatorStore } from '../../hooks/useCreatorStore';

const MessageEditor = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const messages = useCreatorStore((state) => state.messages);
  const addMessage = useCreatorStore((state) => state.addMessage);
  const removeMessage = useCreatorStore((state) => state.removeMessage);

  const handleAdd = () => {
    if (currentMessage.length < 10) {
      alert("Messages must be at least 10 characters long.");
      return;
    }
    if (messages.length >= 10) {
      alert("You can add a maximum of 10 messages.");
      return;
    }
    addMessage(currentMessage);
    setCurrentMessage('');
  };

  const getCharacterColor = () => {
    const length = currentMessage.length;
    if (length < 10) return 'text-red-500';
    if (length >= 10 && length <= 150) return 'text-green-500';
    if (length > 150) return 'text-orange-500';
    return 'text-gray-500';
  };

  const canAdd = currentMessage.length >= 10 && currentMessage.length <= 200 && messages.length < 10;

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6">
        <label className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-3xl">🎈</span>
          Add Balloon Messages
          <span className="text-sm font-normal text-gray-400 ml-2">(Optional)</span>
        </label>
        <div className="flex items-start gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-gray-700 leading-relaxed">
            Create fun messages that will float by on colorful balloons. Each message must be 10-200 characters. You can add up to 10 messages.
          </p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-5 mb-6 hover:border-gray-300 transition-all">
        <div className="space-y-4">
          {/* Text Input with Icon */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setCurrentMessage(e.target.value);
                }
              }}
              placeholder="Write a short memory or wish..."
              className="w-full pl-12 pr-4 py-4 text-base font-medium text-gray-800 
                       bg-gray-50 border-2 border-gray-200 rounded-xl
                       transition-all duration-200
                       hover:bg-white hover:border-gray-300
                       focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                       placeholder:text-gray-400"
            />
          </div>

          {/* Character Counter and Button Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${getCharacterColor()}`}>
                {currentMessage.length} / 200
              </span>
              {currentMessage.length < 10 && currentMessage.length > 0 && (
                <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                  Min 10 chars
                </span>
              )}
              {currentMessage.length >= 10 && (
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ready
                </span>
              )}
            </div>

            <button
              onClick={handleAdd}
              disabled={!canAdd}
              className={`px-6 py-3 font-bold rounded-xl shadow-md transition-all duration-200
                        flex items-center gap-2
                        ${canAdd
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Message
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {/* Header when messages exist */}
        {messages.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                {messages.length}
              </span>
              Balloon Message{messages.length !== 1 ? 's' : ''}
            </h3>
            <span className="text-sm text-gray-500">
              {10 - messages.length} slot{10 - messages.length !== 1 ? 's' : ''} remaining
            </span>
          </div>
        )}

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🎈</div>
            <p className="text-lg font-semibold text-gray-700 mb-2">No messages yet</p>
            <p className="text-sm text-gray-500">
              Start adding balloon messages to make the birthday page more special!
            </p>
          </div>
        )}

        {/* Messages Grid */}
        {messages.length > 0 && (
          <div className="grid gap-3">
            {messages.map((msg, index) => (
              <div 
                key={msg.id} 
                className="group bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 
                         rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200
                         flex items-start gap-4"
              >
                {/* Balloon Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 
                                flex items-center justify-center text-white font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* Message Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium break-words leading-relaxed">
                    {msg.text}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {msg.text.length} characters
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeMessage(msg.id)}
                  className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-50 text-red-500 
                           hover:bg-red-500 hover:text-white transition-all duration-200
                           flex items-center justify-center group-hover:scale-110"
                  aria-label="Remove message"
                  title="Remove this message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {messages.length > 0 && (
          <div className="mt-6 bg-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Progress</span>
              <span className="text-sm font-bold text-blue-600">
                {messages.length} / 10
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(messages.length / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageEditor