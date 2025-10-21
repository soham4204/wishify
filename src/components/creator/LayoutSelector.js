// src/components/creator/LayoutSelector.js
import React from 'react';
import { useCreatorStore } from '../../hooks/useCreatorStore';

const LayoutSelector = () => {
  const photoLayout = useCreatorStore((state) => state.photoLayout);
  const setPhotoLayout = useCreatorStore((state) => state.setPhotoLayout);

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-800 mb-3">
        Photo Layout
      </label>
      <div className="flex gap-4">
        {/* Carousel Option */}
        <label
          className={`flex-1 p-4 border rounded-lg cursor-pointer text-center
                      ${photoLayout === 'carousel' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'}`}
        >
          <input
            type="radio"
            name="layout"
            value="carousel"
            checked={photoLayout === 'carousel'}
            onChange={() => setPhotoLayout('carousel')}
            className="sr-only" // Hide the radio, we style the label
          />
          <span className="text-2xl">🎠</span>
          <span className="block font-semibold">Carousel</span>
        </label>
        
        {/* Timeline Option */}
        <label
          className={`flex-1 p-4 border rounded-lg cursor-pointer text-center
                      ${photoLayout === 'timeline' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'}`}
        >
          <input
            type="radio"
            name="layout"
            value="timeline"
            checked={photoLayout === 'timeline'}
            onChange={() => setPhotoLayout('timeline')}
            className="sr-only"
          />
          <span className="text-2xl">🗓️</span>
          <span className="block font-semibold">Timeline</span>
        </label>
      </div>
    </div>
  );
};

export default LayoutSelector;