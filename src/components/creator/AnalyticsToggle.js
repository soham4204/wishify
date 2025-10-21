// src/components/creator/AnalyticsToggle.js
import React from 'react';
import { useCreatorStore } from '../../hooks/useCreatorStore';

const AnalyticsToggle = () => {
  const showViewCount = useCreatorStore((state) => state.showViewCount);
  const setShowViewCount = useCreatorStore((state) => state.setShowViewCount);

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Page Settings
      </label>
      <div className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg">
        <span className="text-gray-700">Show page view counter?</span>
        <button
          onClick={() => setShowViewCount(!showViewCount)}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors
                      ${showViewCount ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform
                        ${showViewCount ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>
    </div>
  );
};

export default AnalyticsToggle;