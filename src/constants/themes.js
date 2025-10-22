// src/constants/themes.js

export const THEMES = {
  pastelDreams: {
    id: 'pastelDreams',
    name: 'Pastel Dreams',
    // --- Upgraded ---
    bg: 'bg-gradient-to-br from-pink-100 to-blue-100',
    cardBg: 'bg-white/70 backdrop-blur-lg border border-pink-200',
    textPrimary: 'text-slate-700',
    textAccent: 'text-pink-700',
    buttonBg: 'bg-pink-500',
    buttonText: 'text-white',
    // --- Original ---
    confetti: ['#fbcfe8', '#a5f3fc', '#fef3c7'],
  },
  vibrantParty: {
    id: 'vibrantParty',
    name: 'Vibrant Party',
    // --- Upgraded ---
    bg: 'bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300',
    cardBg: 'bg-white/70 backdrop-blur-lg border border-yellow-300',
    textPrimary: 'text-red-700',
    textAccent: 'text-orange-600',
    buttonBg: 'bg-red-600',
    buttonText: 'text-white',
    // --- Original ---
    confetti: ['#fde047', '#ef4444', '#22d3ee'],
  },
  elegantClassic: {
    id: 'elegantClassic',
    name: 'Elegant Classic',
    // --- Upgraded ---
    bg: 'bg-gradient-to-br from-slate-800 to-gray-900',
    cardBg: 'bg-gray-800/70 backdrop-blur-lg border border-gray-600',
    textPrimary: 'text-white',
    textAccent: 'text-yellow-400',
    buttonBg: 'bg-yellow-500',
    buttonText: 'text-gray-900', // Dark text on yellow for readability
    // --- Original ---
    confetti: ['#facc15', '#e5e7eb', '#d1d5db'],
  },
  kidsFun: {
    id: 'kidsFun',
    name: 'Kids Fun',
    // --- Upgraded ---
    bg: 'bg-gradient-to-br from-cyan-200 to-green-200',
    cardBg: 'bg-white/70 backdrop-blur-lg border border-cyan-300',
    textPrimary: 'text-blue-800',
    textAccent: 'text-green-700',
    buttonBg: 'bg-blue-500',
    buttonText: 'text-white',
    // --- Original ---
    confetti: ['#60a5fa', '#4ade80', '#f87171'],
  },
  
  // --- New Bonus Theme ---
  // A modern, dark "violet" theme based on the Cursor AI prompt
  modernViolet: {
    id: 'modernViolet',
    name: 'Modern Violet',
    bg: 'bg-gradient-to-br from-slate-50 to-violet-100',
    cardBg: 'bg-white/70 backdrop-blur-lg border border-violet-200',
    textPrimary: 'text-slate-800',
    textAccent: 'text-violet-600',
    buttonBg: 'bg-violet-600',
    buttonText: 'text-white',
    confetti: ['#8b5cf6', '#a78bfa', '#ddd6fe'],
  }
};