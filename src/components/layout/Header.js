import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png'

// Enhanced Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-violet-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <img 
            src={logo} 
            alt="Wishify Logo" 
            className="h-16 w-16 object-contain group-hover:scale-110 transition-transform"
            />
            <span className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent py-2">
              Wishify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/create"
              className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Create Wish
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-violet-50 transition-colors"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-violet-100"
          >
            <div className="flex flex-col space-y-3">
              <Link
                to="/create"
                className="mx-4 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Wish
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;