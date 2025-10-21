// src/components/birthday/CustomMessageDisplay.js
import React from 'react';
import DOMPurify from 'dompurify';

const CustomMessageDisplay = ({ htmlContent, theme }) => {
  if (!htmlContent || htmlContent === '<p><br></p>') return null;

  // FR-2.5: Sanitize input
  const cleanHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div
      className={`w-full max-w-3xl mx-auto my-8 p-6 bg-white bg-opacity-70 rounded-lg shadow-xl backdrop-blur-sm`}
    >
      <h2 className={`text-3xl font-bold mb-4 ${theme?.text || 'text-gray-800'}`}>
        A Special Message
      </h2>

      {/* FR-2.6: Render safe HTML */}
      <div
        className={`rendered-message ${theme?.text || 'text-gray-700'}`}
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </div>
  );
};

export default CustomMessageDisplay;
