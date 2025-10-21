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
    if (messages.length >= 10) { // Limit to 10 balloons (FR-11.1)
      alert("You can add a maximum of 10 messages.");
      return;
    }
    addMessage(currentMessage);
    setCurrentMessage('');
  };

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Add Balloon Messages (Optional)
      </label>
      <p className="text-sm text-gray-500 mb-2">
        Add short, hidden messages that will float by on balloons. (Min 10, Max 200 chars)
      </p>
      
      {/* Input Form */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => {
            if (e.target.value.length <= 200) { // FR-11.6
              setCurrentMessage(e.target.value);
            }
          }}
          placeholder="Write a short memory or wish..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          disabled={messages.length >= 10 || currentMessage.length < 10}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                     hover:bg-blue-700 disabled:bg-gray-400"
        >
          Add
        </button>
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">
        {currentMessage.length} / 200
      </p>

      {/* Message List */}
      <div className="mt-4 space-y-2">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg"
          >
            {/* --- FIX 1: Added min-w-0 --- */}
            <p className="text-gray-700 truncate min-w-0">{msg.text}</p>

            <button
              onClick={() => removeMessage(msg.id)}
              className="ml-4 text-red-500 hover:text-red-700 font-bold"
              aria-label="Remove message"
            >
              &times;
            </button>
          </div>
        ))}
        {messages.length > 0 && (
          // --- FIX 2: Added a static key ---
          <p 
            key="message-count" 
            className="text-sm text-gray-600 text-center pt-2"
          >
            {messages.length} / 10 messages added
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageEditor;