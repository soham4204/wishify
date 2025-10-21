// src/components/birthday/PhotoCarousel.js
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import modules (no Lazy)
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const PhotoCarousel = ({ images }) => {
  const displayImages = images.length > 0 ? images : [
    { id: 'default1', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    { id: 'default3', url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
  ];

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto my-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination-custom',
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={displayImages.length > 1}
        className="rounded-2xl shadow-2xl overflow-hidden"
        style={{
          '--swiper-navigation-color': '#8b5cf6',
          '--swiper-pagination-color': '#8b5cf6',
        }}
      >
        {displayImages.map((image, index) => (
          <SwiperSlide key={image.id} className="aspect-video bg-gradient-to-br from-slate-100 to-violet-100">
            <motion.img
              src={image.url}
              loading="lazy"
              className="w-full h-full object-cover"
              alt="Birthday memory"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer">
        <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer">
        <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom flex justify-center mt-6 space-x-2"></div>

      <style jsx>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(139, 92, 246, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active-custom {
          background: #8b5cf6;
          transform: scale(1.2);
        }
      `}</style>
    </motion.div>
  );
};

export default PhotoCarousel;
