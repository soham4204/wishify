// src/components/creator/ImageUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCreatorStore } from '../../hooks/useCreatorStore';
import { uploadImage } from '../../services/cloudinary';

const ImageUpload = () => {
  const { images, addImage, removeImage, isUploading, setUploading, updateImageDetails } = useCreatorStore();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (images.length >= 20) { // FR-3.6: Max 20 images
      alert("You can only upload a maximum of 20 images.");
      return;
    }

    setUploading(true);
    for (const file of acceptedFiles) {
      if (images.length + 1 > 20) break; // Stop if we hit limit mid-upload
      try {
        const { url, publicId } = await uploadImage(file);
        addImage(url, publicId); // Add to store
      } catch (error) {
        console.error(error);
        alert("An error occurred during upload. Please try again.");
      }
    }
    setUploading(false);
  }, [images, addImage, setUploading]);

  const handleDetailChange = (id, field, value) => {
    const image = images.find(img => img.id === id);
    if (field === 'caption') {
      updateImageDetails(id, value, image.date);
    } else if (field === 'date') {
      updateImageDetails(id, image.caption, value);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { // FR-3.3: Accepted formats
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/webp': [],
    },
    maxSize: 20 * 1024 * 1024, // 20MB *before* compression
    maxFiles: 20, // Max files in one drop
  });

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-800 mb-2">
        Add Photos (Max 20)
      </label>
      
      {/* --- Dropzone (FR-3.1, FR-3.2) --- */}
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors
                   ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Drag 'n' drop some pictures here, or click to select files
        </p>
        <p className="text-sm text-gray-400">(JPG, PNG, GIF, WebP)</p>
      </div>

      {/* --- Progress Indicator (FR-3.5) --- */}
      {isUploading && (
        <div className="mt-4 text-center">
          <p className="font-semibold text-blue-600 animate-pulse">
            Uploading...
          </p>
        </div>
      )}

      {/* --- Thumbnail Previews (FR-3.11) --- */}
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image) => (
            <div key={image.id} className="flex gap-3 p-3 bg-gray-50 border rounded-lg">
              {/* Thumbnail */}
              <div className="relative group w-24 h-24 flex-shrink-0">
                <img
                  src={image.url}
                  alt="Uploaded thumbnail"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full 
                             w-5 h-5 flex items-center justify-center text-xs font-bold
                             opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete image"
                >
                  &times;
                </button>
              </div>
              
              {/* --- 3. Add Caption & Date Inputs --- */}
              <div className="flex-grow space-y-2">
                <input
                  type="text"
                  placeholder="Add a caption..."
                  value={image.caption}
                  onChange={(e) => handleDetailChange(image.id, 'caption', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Date or Year (e.g., '2015')"
                  value={image.date}
                  onChange={(e) => handleDetailChange(image.id, 'date', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Default Images (FR-3.8) - Placeholder --- */}
      {images.length === 0 && !isUploading && (
        <div className="mt-4 text-center text-gray-500">
          <p>No images added yet. Upload some to make it personal!</p>
          <p>(We'll show default images if you don't add any)</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;