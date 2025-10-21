// src/components/birthday/PhotoTimeline.js
import React from 'react';

const PhotoTimeline = ({ images, theme }) => {
  // Filter out images that don't have a date, as they don't fit the timeline
  const timelineImages = images.filter(img => img.date || img.caption);

  // Use default images if no suitable ones are found
  const defaultImages = [
    { id: 'd1', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176', caption: 'The beginning!', date: '2010' },
    { id: 'd2', url: 'https://images.unsplash.com/photo-1549465220-1a8a9238cd48', caption: 'Good times', date: '2015' },
    { id: 'd3', url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84', caption: 'Right now!', date: 'Today' },
  ];
  
  const displayImages = timelineImages.length > 0 ? timelineImages : defaultImages;

  return (
    <div className="timeline-container my-12">
      {displayImages.map((image, index) => (
        <div
          // Alternate left and right
          className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          key={image.id}
        >
          <div 
            className="timeline-content" 
            style={{ borderColor: theme.confetti[0], borderTopWidth: '4px' }}
          >
            {/* FR-20.5: Year marker */}
            <h2 className={`text-xl font-bold ${theme.text}`}>{image.date}</h2>
            
            {/* FR-20.1: Caption */}
            <p className={`text-gray-700 my-2`}>{image.caption}</p>
            
            <img
              src={image.url}
              alt={image.caption || 'Timeline memory'}
              className="w-full rounded-lg shadow-md mt-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoTimeline;