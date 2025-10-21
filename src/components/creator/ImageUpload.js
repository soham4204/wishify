// src/components/creator/ImageUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
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
      <motion.label 
        className="block text-xl font-semibold text-slate-800 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Add Photos (Max 20)
      </motion.label>
      
      {/* --- Enhanced Dropzone --- */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
                   ${isDragActive ? 'border-violet-500 bg-violet-50/50 scale-105' : 'border-violet-300 bg-violet-50/30 hover:border-violet-400 hover:bg-violet-50/50'}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <svg className="mx-auto h-12 w-12 text-violet-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-slate-600 font-medium">
            Drag 'n' drop some pictures here, or click to select files
          </p>
          <p className="text-sm text-slate-400">(JPG, PNG, GIF, WebP)</p>
        </div>
      </motion.div>

      {/* --- Progress Indicator --- */}
      {isUploading && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-violet-600"></div>
            <p className="font-semibold text-violet-600">
              Uploading...
            </p>
          </div>
        </motion.div>
      )}

      {/* --- Enhanced Thumbnail Previews --- */}
      {images.length > 0 && (
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {images.map((image, index) => (
            <motion.div 
              key={image.id} 
              className="flex gap-4 p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Enhanced Thumbnail */}
              <div className="relative group w-24 h-24 flex-shrink-0">
                <img
                  src={image.url}
                  alt="Uploaded thumbnail"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                <motion.button
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full 
                             w-6 h-6 flex items-center justify-center text-sm font-bold
                             shadow-lg transition-all duration-200"
                  aria-label="Delete image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  &times;
                </motion.button>
              </div>
              
              {/* Enhanced Caption & Date Inputs */}
              <div className="flex-grow space-y-3">
                <input
                  type="text"
                  placeholder="Add a caption..."
                  value={image.caption}
                  onChange={(e) => handleDetailChange(image.id, 'caption', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="Date or Year (e.g., '2015')"
                  value={image.date}
                  onChange={(e) => handleDetailChange(image.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* --- Default Images Message --- */}
      {images.length === 0 && !isUploading && (
        <motion.div 
          className="mt-6 text-center text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-medium">No images added yet. Upload some to make it personal!</p>
          <p className="text-sm">(We'll show default images if you don't add any)</p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;