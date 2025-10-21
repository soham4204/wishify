// src/hooks/useCreatorStore.js
import { create } from 'zustand';

export const useCreatorStore = create((set) => ({
  // --- Core Data ---
  birthdayPersonName: '',
  theme: 'pastelDreams', // Default theme (FR-4.4)
  images: [],
  photoLayout: 'carousel',
  isUploading: false, // FR-3.5: Upload progress indicator

  // --- Phase 2 Data (from SRS) ---
  music: null,
  messages: [],
  birthdayDate: null,
  customMessage: '',

  // --- Phase 3 Data (from SRS) ---
  creatorName: '',
  age: null,
  voiceMessage: null,
  showViewCount: true,

  // --- Actions ---
  // Core setters
  setBirthdayPersonName: (name) => set({ birthdayPersonName: name }),
  setCreatorName: (name) => set({ creatorName: name }),
  setAge: (age) => set({ age }),
  setBirthdayDate: (date) => set({ birthdayDate: date }),
  setCustomMessage: (message) => set({ customMessage: message }),
  setVoiceMessage: (url) => set({ voiceMessage: url }),
  removeVoiceMessage: () => set({ voiceMessage: null }),
  setShowViewCount: (show) => set({ showViewCount: show }),

  // --- Image Upload Management (FR-3.9, FR-3.10) ---
  setUploading: (status) => set({ isUploading: status }),

  addImage: (url, publicId) => {
    set((state) => ({
      images: [
        ...state.images, 
        // Add new properties for caption and date
        { url, id: publicId, caption: '', date: '' } 
      ],
    }));
  },

  // NEW ACTION: updateImageDetails (FR-20.1)
  updateImageDetails: (id, caption, date) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, caption, date } : img
      )
    }));
  },

  removeImage: (publicId) => {
    set((state) => ({
      images: state.images.filter((img) => img.id !== publicId),
    }));
  },

  // --- Message Management ---
  addMessage: (text) =>
    set((state) => ({
      messages: [
        ...state.messages, 
        { 
          id: Date.now().toString() + Math.random(), // Unique ID
          text: text 
        }
      ],
    })),

  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
  setTheme: (themeId) => set({ theme: themeId }),
  setPhotoLayout: (layout) => set({ photoLayout: layout }),
  setMusic: (musicId) => set({ music: musicId }),
}));