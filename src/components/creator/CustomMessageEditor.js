// src/components/creator/CustomMessageEditor.js
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useCreatorStore } from '../../hooks/useCreatorStore';

// Enhanced toolbar setup
const CustomMessageEditor = () => {
  const customMessage = useCreatorStore((state) => state.customMessage);
  const setCustomMessage = useCreatorStore((state) => state.setCustomMessage);

  // Memoize modules & formats to prevent re-creation on every render
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ],
    }),
    []
  );

  const formats = useMemo(
    () => ['header', 'bold', 'italic', 'underline', 'list', 'bullet'],
    []
  );

  return (
    <div className="w-full">
      <motion.label 
        className="block text-xl font-semibold text-slate-800 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Add a Personal Message (Optional)
      </motion.label>
      <motion.p 
        className="text-sm text-slate-500 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Write a heartfelt message, a funny story, or an inside joke.
      </motion.p>

      <motion.div 
        className="h-80 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ReactQuill
          theme="snow"
          value={customMessage}
          onChange={setCustomMessage}
          modules={modules}
          formats={formats}
          placeholder="Start writing your message here..."
          style={{ 
            height: '280px',
            backgroundColor: 'transparent'
          }}
        />
      </motion.div>

      <motion.p 
        className="text-right text-sm text-slate-500 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {customMessage?.length || 0} / 1000
      </motion.p>

      <style jsx global>{`
        .ql-toolbar {
          background: rgba(248, 250, 252, 0.8) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.5) !important;
          border-radius: 8px 8px 0 0 !important;
        }
        .ql-container {
          background: transparent !important;
          border: 1px solid rgba(226, 232, 240, 0.5) !important;
          border-top: none !important;
          border-radius: 0 0 8px 8px !important;
        }
        .ql-editor {
          background: transparent !important;
          color: #334155 !important;
          font-size: 16px !important;
          line-height: 1.6 !important;
        }
        .ql-editor.ql-blank::before {
          color: #94a3b8 !important;
          font-style: normal !important;
        }
        .ql-toolbar .ql-stroke {
          stroke: #64748b !important;
        }
        .ql-toolbar .ql-fill {
          fill: #64748b !important;
        }
        .ql-toolbar button:hover .ql-stroke {
          stroke: #8b5cf6 !important;
        }
        .ql-toolbar button:hover .ql-fill {
          fill: #8b5cf6 !important;
        }
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #8b5cf6 !important;
        }
        .ql-toolbar button.ql-active .ql-fill {
          fill: #8b5cf6 !important;
        }
      `}</style>
    </div>
  );
};

export default CustomMessageEditor;
