// src/components/birthday/GratitudeForm.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      {/* Enhanced Button */}
      <div className="text-center mt-12">
        <motion.button
          onClick={() => setModalOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          💌 Leave a Thank You Message
        </motion.button>
      </div>

      {/* Enhanced Modal with Glassmorphism */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div 
              className="glass-modal p-8 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h2 
                className="text-3xl font-display text-slate-800 mb-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Send a Thank You
              </motion.h2>
              <form onSubmit={handleSubmit}>
                <motion.textarea
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessage(e.target.value);
                    }
                  }}
                  className="w-full h-40 p-4 border border-slate-200 rounded-xl shadow-inner bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 resize-none"
                  placeholder="Write your message to the creator..."
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.p 
                  className="text-right text-sm text-slate-500 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {message.length} / 500
                </motion.p>
                <motion.div 
                  className="flex justify-end gap-4 mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-3 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={loading || message.length < 5}
                    className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200"
                    whileHover={{ scale: loading ? 1 : 1.05 }}
                    whileTap={{ scale: loading ? 1 : 0.95 }}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send'
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GratitudeForm;