// src/pages/BirthdayPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getBirthdayPage, incrementViewCount } from '../services/firestore';
import NotFound from './NotFound';
import { motion } from 'framer-motion';
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: 'spring',
        stiffness: 100,
      },
    }),
  };

  return (
    // Main page container
    <div
      className={`min-h-screen transition-colors duration-500 ${theme.bg} overflow-x-hidden`}
    >
      <Helmet>
        <title>{pageTitle}</title>
         <meta name="description" content={`Celebrate ${pageData.birthdayPersonName}'s special day!`} />
         <meta property="og:title" content={pageTitle} />
         <meta property="og:url" content={currentPageUrl} />
         {/* Add preview image to meta */}
         <meta property="og:image" content={pageData.images[0]?.url || 'default-preview-image.jpg'} />
      </Helmet>
      
      {/* Background/Overlay Components */}
      <ConfettiAnimation themeColors={theme.confetti} />
      <BackgroundMusicPlayer musicId={pageData.settings.music} />
      <MessageBalloons messages={pageData.messages} themeId={pageData.theme} />

      {/* --- Main Content Container --- */}
      <main className="relative z-10 p-4 md:p-8 max-w-5xl mx-auto flex flex-col gap-10">
        
        <motion.section
          className={`p-6 md:p-10 rounded-xl shadow-2xl ${theme.cardBg}`}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h1 className={`text-5xl md:text-7xl font-display text-center ${theme.textPrimary} mb-6`}>
            Happy Birthday, {pageData.birthdayPersonName}!
          </h1>
          <AgeDisplay age={pageData.settings.age} theme={theme} />
          
          <div className="mt-8 space-y-8">
            <VoiceMessagePlayer url={pageData.voiceMessage} theme={theme} />
            <CustomMessageDisplay
              htmlContent={pageData.customMessage}
              theme={theme}
            />
          </div>
        </motion.section>

        {/* --- Card 2: Memories --- */}
        <motion.section
          className={`p-6 md:p-10 rounded-xl shadow-2xl ${theme.cardBg}`}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h2 className={`text-4xl font-display text-center ${theme.textAccent} mb-8`}>
            A Look Back...
          </h2>
          {pageData.photoLayout === 'timeline' ? (
            <PhotoTimeline images={pageData.images} theme={theme} />
          ) : (
            <PhotoCarousel images={pageData.images} />
          )}
        </motion.section>

        {/* --- Card 3: Activities --- */}
        <motion.section
          className={`p-6 md:p-10 rounded-xl shadow-2xl ${theme.cardBg}`}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h2 className={`text-4xl font-display text-center ${theme.textAccent} mb-8`}>
            Time to Celebrate!
          </h2>
          <DigitalCake />
          <MakeAWish theme={theme} />
        </motion.section>

        {/* --- Footer & Gratitude --- */}
        <footer className="mt-8 text-center space-y-6">
          {!pageData.thankYouMessage && (
            <GratitudeForm birthdayId={birthdayId} theme={theme} />
          )}

          {pageData.thankYouMessage && (
            <motion.div
              className={`p-6 md:p-10 rounded-xl shadow-2xl ${theme.cardBg}`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <h3 className={`text-3xl font-display ${theme.textAccent} mb-4`}>
                A Message from {pageData.birthdayPersonName}
              </h3>
              <p className={`text-xl ${theme.textPrimary} italic`}>
                "{pageData.thankYouMessage.content}"
              </p>
            </motion.div>
          )}

          {pageData.settings.showViewCount && (
            <p className={`${theme.textPrimary} opacity-60`}>
              👀 Seen {viewCount} times
            </p>
          )}
        </footer>
      </main>
    </div>
  );
};

export default BirthdayPage;