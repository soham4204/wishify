// src/pages/BirthdayPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import AgeDisplay from '../components/birthday/AgeDisplay';

const BirthdayPage = ({ isPreview = false }) => {
  const { birthdayId } = useParams();
  const location = useLocation();

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  const theme = pageData ? THEMES[pageData.theme] : THEMES.pastelDreams;
  const currentPageUrl = window.location.href;

  useEffect(() => {
    if (isPreview) {
      // --- PREVIEW MODE LOGIC ---
      const data = location.state?.previewData;
      if (data) {
        setPageData(data);
        setViewCount(data.viewCount || 0);

        if (data.settings.birthdayDate) {
          const birthdayTime = data.settings.birthdayDate;
          setIsTimeUp(birthdayTime.getTime() <= Date.now());
        } else {
          setIsTimeUp(true);
        }
      } else {
        // Navigated directly to /preview without data
        setError(true);
      }
      setLoading(false);
    } else {
      // --- FIREBASE DATA FETCH ---
      const fetchData = async () => {
        await incrementViewCount(birthdayId);
        try {
          const data = await getBirthdayPage(birthdayId);
          if (data) {
            setPageData(data);
            setViewCount(data.viewCount);

            if (data.settings.birthdayDate) {
              const birthdayTime = data.settings.birthdayDate.toDate();
              setIsTimeUp(birthdayTime.getTime() <= Date.now());
            } else {
              setIsTimeUp(true);
            }
          } else {
            setError(true);
          }
        } catch (err) {
          console.error('Error fetching page:', err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [birthdayId, isPreview, location.state]);

  // --- RENDER ORDER FIXES ---

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

  if (!isTimeUp) {
    return (
      <BirthdayCountdown
        name={pageData.birthdayPersonName}
        targetDate={
          isPreview
            ? pageData.settings.birthdayDate
            : pageData.settings.birthdayDate.toDate()
        }
        themeId={pageData.theme}
        onComplete={() => setIsTimeUp(true)}
      />
    );
  }

  const pageTitle = `Happy Birthday, ${pageData.birthdayPersonName}!`;

  return (
    <div
      className={`p-8 min-h-screen transition-colors duration-500 ${theme.bg} overflow-hidden`}
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Celebrate ${pageData.birthdayPersonName}'s special day!`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={currentPageUrl} />
      </Helmet>

      <ConfettiAnimation themeColors={theme.confetti} />
      <BackgroundMusicPlayer musicId={pageData.settings.music} />

      <h1 className={`text-5xl font-bold text-center ${theme.text} mb-4`}>
        Happy Birthday, {pageData.birthdayPersonName}!
      </h1>
      <AgeDisplay age={pageData.settings.age} theme={theme} />

      <VoiceMessagePlayer url={pageData.voiceMessage} theme={theme} />

      <CustomMessageDisplay
        htmlContent={pageData.customMessage}
        theme={theme}
      />

      {pageData.photoLayout === 'timeline' ? (
        <PhotoTimeline images={pageData.images} theme={theme} />
      ) : (
        <PhotoCarousel images={pageData.images} />
      )}

      <MessageBalloons messages={pageData.messages} themeId={pageData.theme} />

      <DigitalCake />

      <MakeAWish theme={theme} />

      <footer className="mt-16 text-center">
        {!pageData.thankYouMessage && (
          <GratitudeForm birthdayId={birthdayId} theme={theme} />
        )}

        {pageData.thankYouMessage && (
          <div
            className={`p-6 bg-white bg-opacity-70 rounded-lg shadow-xl backdrop-blur-sm max-w-2xl mx-auto`}
          >
            <h3 className={`text-2xl font-bold ${theme.text} mb-3`}>
              A Message from {pageData.birthdayPersonName}
            </h3>
            <p className={`text-lg ${theme.text} italic`}>
              "{pageData.thankYouMessage.content}"
            </p>
          </div>
        )}

        {pageData.settings.showViewCount && (
          <p className={`${theme.text} opacity-70 mb-6`}>
            👀 Seen {viewCount} times
          </p>
        )}
      </footer>
    </div>
  );
};

export default BirthdayPage;
