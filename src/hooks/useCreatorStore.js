// src/hooks/useCreatorStore.js
import { create } from 'zustand';

export const useCreatorStore = create((set) => ({
  // --- Core Data ---
  birthdayPersonName: '',
  theme: 'pastelDreams', // Default theme (FR-4.4)
  images: [], // FR-3.9: Will hold { url: '...', id: '...' }
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

  // --- Actions ---
  // Core setters
  setBirthdayPersonName: (name) => set({ birthdayPersonName: name }),
  setCreatorName: (name) => set({ creatorName: name }),
  setAge: (age) => set({ age }),
  setBirthdayDate: (date) => set({ birthdayDate: date }),
  setCustomMessage: (message) => set({ customMessage: message }),
  setVoiceMessage: (voiceFile) => set({ voiceMessage: voiceFile }),

  // --- Image Upload Management (FR-3.9, FR-3.10) ---
  setUploading: (status) => set({ isUploading: status }),

  addImage: (url, publicId) => {
    set((state) => ({
      images: [...state.images, { url, id: publicId }],
    }));
  },

  removeImage: (publicId) => {
    set((state) => ({
      images: state.images.filter((img) => img.id !== publicId),
    }));
  },

  // --- Message Management ---
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  removeMessage: (index) =>
    set((state) => ({
      messages: state.messages.filter((_, i) => i !== index),
    })),

  // --- Theme Selection (FR-4.4) ---
  setTheme: (themeId) => set({ theme: themeId }),

  setMusic: (musicId) => set({ music: musicId }),
}));
