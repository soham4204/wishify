// src/services/cloudinary.js
import axios from 'axios';
import imageCompression from 'browser-image-compression';

// Get credentials from environment
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const VIDEO_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;

/**
 * Compresses and uploads a file to Cloudinary
 * @param {File} file - The file to upload
 * @returns {Promise<object>} - A promise that resolves with { url, publicId }
 */
export const uploadImage = async (file) => {
  console.log(`Uploading file: ${file.name}`);

  // --- Compression (FR-3.7) ---
  const options = {
    maxSizeMB: 2,         // Max 2MB
    maxWidthOrHeight: 1920, // Resize large images
    useWebWorker: true,
  };

  let compressedFile;
  try {
    compressedFile = await imageCompression(file, options);
    console.log(`Compressed file size: ${compressedFile.size / 1024 / 1024} MB`);
  } catch (error) {
    console.error("Compression failed:", error);
    throw new Error("Image compression failed.");
  }

  // --- Upload (FR-3.4) ---
  const formData = new FormData();
  formData.append('file', compressedFile);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(UPLOAD_URL, formData);
    const { secure_url, public_id } = response.data;
    return { url: secure_url, publicId: public_id };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload failed.");
  }
};

/**
 * Uploads an audio blob to Cloudinary
 * @param {Blob} audioBlob - The audio file to upload
 * @returns {Promise<object>} - A promise that resolves with { url, publicId }
 */
export const uploadAudio = async (audioBlob) => {
  console.log("Uploading audio...");

  const formData = new FormData();
  formData.append('file', audioBlob, 'voice-message.mp3');
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('resource_type', 'video'); // Cloudinary treats audio as 'video'

  try {
    const response = await axios.post(VIDEO_UPLOAD_URL, formData);
    const { secure_url, public_id } = response.data;
    return { url: secure_url, publicId: public_id };
  } catch (error) {
    console.error("Cloudinary audio upload failed:", error);
    throw new Error("Audio upload failed.");
  }
};