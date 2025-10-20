// src/pages/BirthdayPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBirthdayPage } from '../services/firestore';
import NotFound from './NotFound';
import { THEMES } from '../constants/themes'; // Import themes
import ConfettiAnimation from '../components/birthday/ConfettiAnimation'; // Import confetti
import PhotoCarousel from '../components/birthday/PhotoCarousel'; // Import carousel
import DigitalCake from '../components/birthday/DigitalCake';
import BackgroundMusicPlayer from '../components/birthday/BackgroundMusicPlayer'; // Import

const BirthdayPage = () => {
  const { birthdayId } = useParams();
  
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Get the current theme object
  const theme = pageData ? THEMES[pageData.theme] : THEMES.pastelDreams;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBirthdayPage(birthdayId);
        if (data) {
          setPageData(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [birthdayId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-2xl font-semibold animate-pulse">
          Loading your celebration...
        </p>
      </div>
    );
  }

  if (error || !pageData) {
    return <NotFound />;
  }

  // --- Success State ---
  // FR-4.3: Apply theme to all page elements
  return (
    <div className={`p-8 min-h-screen transition-colors duration-500 ${theme.bg}`}>
      <ConfettiAnimation themeColors={theme.confetti} />
      <BackgroundMusicPlayer musicId={pageData.settings.music} />
      
      {/* FR-2.4: Display name prominently */}
      <h1 className={`text-5xl font-bold text-center ${theme.text} mb-12`}>
        Happy Birthday, {pageData.birthdayPersonName}!
      </h1>

      {/* FR-6.1: Photo Carousel */}
      <PhotoCarousel images={pageData.images} />

      {/* digital candle */}
      <DigitalCake />
    </div>
  );
};

export default BirthdayPage;