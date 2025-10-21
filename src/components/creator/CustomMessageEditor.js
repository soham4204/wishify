// src/components/creator/CustomMessageEditor.js
import React, { useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useCreatorStore } from '../../hooks/useCreatorStore';

// Toolbar setup (FR-13.3)
const CustomMessageEditor = () => {
  const customMessage = useCreatorStore((state) => state.customMessage);
  const setCustomMessage = useCreatorStore((state) => state.setCustomMessage);

  // ✅ Memoize modules & formats to prevent re-creation on every render
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
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Add a Personal Message (Optional)
      </label>
      <p className="text-sm text-gray-500 mb-2">
        Write a heartfelt message, a funny story, or an inside joke.
      </p>

      <div className="h-72">
        <ReactQuill
          theme="snow"
          value={customMessage}
          onChange={setCustomMessage}
          modules={modules}
          formats={formats}
          placeholder="Start writing your message here..."
          style={{ height: '200px' }}
        />
      </div>

      <p className="text-right text-sm text-gray-500 -mt-2">
        {customMessage?.length || 0} / 1000
      </p>
    </div>
  );
};

export default CustomMessageEditor;
