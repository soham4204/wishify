// src/components/birthday/GratitudeForm.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { saveThankYouMessage } from '../../services/firestore';

const GratitudeForm = ({ birthdayId, theme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.length < 5) {
      toast.error("Message is too short!");
      return;
    }

    setLoading(true);
    try {
      await saveThankYouMessage(birthdayId, message);
      toast.success("Thank you message sent!");
      setModalOpen(false);
    } catch (error) {
      toast.error("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- The Button (FR-17.1) --- */}
      <div className="text-center mt-8">
        <button
          onClick={() => setModalOpen(true)}
          className={`px-8 py-3 ${theme.text} font-semibold rounded-lg shadow-md
                      hover:opacity-90 transition-all`}
          style={{ backgroundColor: theme.confetti[0] }}
        >
          💌 Leave a Thank You Message
        </button>
      </div>

      {/* --- The Modal (FR-17.2) --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <div 
            className={`p-8 rounded-lg shadow-2xl ${theme.bg} w-full max-w-lg
                        animate-enter`} // Using a simple enter animation
            style={{ animation: 'enter 0.3s ease-out' }}
          >
            <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>
              Send a Thank You
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={message}
                onChange={(e) => {
                  if (e.target.value.length <= 500) { // FR-17.3
                    setMessage(e.target.value);
                  }
                }}
                className="w-full h-40 p-3 border border-gray-300 rounded-lg shadow-inner
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message to the creator..."
              />
              <p className="text-right text-sm text-gray-500 mt-1">
                {message.length} / 500
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || message.length < 5}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg 
                             hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* We need a simple animation for the modal */}
      <style>{`
        @keyframes enter {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-enter { animation: enter 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default GratitudeForm;