// src/pages/BirthdayPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBirthdayPage, incrementViewCount } from '../services/firestore';
import NotFound from './NotFound';
import { THEMES } from '../constants/themes'; 
import ConfettiAnimation from '../components/birthday/ConfettiAnimation'; 
import PhotoCarousel from '../components/birthday/PhotoCarousel'; 
import DigitalCake from '../components/birthday/DigitalCake';
import BackgroundMusicPlayer from '../components/birthday/BackgroundMusicPlayer'; 
import MessageBalloons from '../components/birthday/MessageBalloons';
import BirthdayCountdown from '../components/birthday/CountDown';
import CustomMessageDisplay from '../components/birthday/CustomMessageDisplay';
import GratitudeForm from '../components/birthday/GratitudeForm';
import VoiceMessagePlayer from '../components/birthday/VoiceMessagePlayer';
import PhotoTimeline from '../components/birthday/PhotoTimeline';
import MakeAWish from '../components/birthday/MakeAWish';

const BirthdayPage = () => {
  const { birthdayId } = useParams();
  
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  
  // Get the current theme object
  // We've moved this to *after* the loading checks to be safer
  const theme = pageData ? THEMES[pageData.theme] : THEMES.pastelDreams;

  useEffect(() => {
    
    const fetchData = async () => {
      await incrementViewCount(birthdayId);
      try {
        const data = await getBirthdayPage(birthdayId);
        if (data) {
          setPageData(data);
          setViewCount(data.viewCount);
          
          // --- COUNTDOWN LOGIC ---
          if (data.settings.birthdayDate) {
            // Firestore timestamps need to be converted
            const birthdayTime = data.settings.birthdayDate.toDate();
            
            if (birthdayTime.getTime() > Date.now()) {
              // It's not time yet
              setIsTimeUp(false);
            } else {
              // The time has passed
              setIsTimeUp(true);
            }
          } else {
            // No date was set, so show immediately
            setIsTimeUp(true);
          }
          
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


  // --- CORRECTED RENDER ORDER ---

  // 1. Check for loading *first*
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-2xl font-semibold animate-pulse">
          Loading your celebration...
        </p>
      </div>
    );
  }

  // 2. Check for errors or empty data *second*
  if (error || !pageData) {
    return <NotFound />;
  }
  
  // 3. *Now* it's safe to check for the countdown, because we know pageData exists
  if (!isTimeUp) {
    return (
      <BirthdayCountdown
        name={pageData.birthdayPersonName}
        targetDate={pageData.settings.birthdayDate.toDate()}
        themeId={pageData.theme}
        onComplete={() => setIsTimeUp(true)} // FR-12.4
      />
    );
  }

  // 4. If not loading, no error, and time is up, show the celebration
  return (
    <div className={`p-8 min-h-screen transition-colors duration-500 ${theme.bg} overflow-hidden`}>
      <ConfettiAnimation themeColors={theme.confetti} />
      <BackgroundMusicPlayer musicId={pageData.settings.music} />
      
      <h1 className={`text-5xl font-bold text-center ${theme.text} mb-12`}>
        Happy Birthday, {pageData.birthdayPersonName}!
      </h1>

      {/* 2. Add the Voice Player */}
      <VoiceMessagePlayer
        url={pageData.voiceMessage}
        theme={theme}
      />

      <CustomMessageDisplay
        htmlContent={pageData.customMessage}
        theme={theme}
      />

      {pageData.photoLayout === 'timeline' ? (
        <PhotoTimeline images={pageData.images} theme={theme} />
      ) : (
        <PhotoCarousel images={pageData.images} />
      )}

      <MessageBalloons 
        messages={pageData.messages} 
        themeId={pageData.theme} 
      />

      <DigitalCake />

      <MakeAWish theme={theme} />
      {/* --- Footer with View Count and Gratitude --- */}
      <footer className="mt-16 text-center">
        {pageData.settings.showViewCount && (
          <p className={`${theme.text} opacity-70 mb-6`}>
            👀 Seen {viewCount} times
          </p>
        )}
        
        {/* --- THIS IS THE UPDATED LOGIC --- */}

        {/* If there is NO message, show the form */}
        {!pageData.thankYouMessage && (
          <GratitudeForm birthdayId={birthdayId} theme={theme} />
        )}
        
        {/* If there IS a message, display it (FR-17.5) */}
        {pageData.thankYouMessage && (
          <div className={`p-6 bg-white bg-opacity-70 rounded-lg shadow-xl backdrop-blur-sm max-w-2xl mx-auto`}>
            <h3 className={`text-2xl font-bold ${theme.text} mb-3`}>
              A Message from {pageData.birthdayPersonName}
            </h3>
            <p className={`text-lg ${theme.text} italic`}>
              "{pageData.thankYouMessage.content}"
            </p>
          </div>
        )}
        
      </footer>
    </div>
  );
};

export default BirthdayPage;