// src/components/birthday/PhotoCarousel.js
import React from 'react';
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
    { id: 'default2', url: 'https://images.unsplash.com/photo-1549465220-1a8a9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    { id: 'default3', url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={displayImages.length > 1}
        className="rounded-lg shadow-xl"
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
      >
        {displayImages.map((image) => (
          <SwiperSlide key={image.id} className="aspect-video bg-gray-200">
            <img
              src={image.url}
              loading="lazy" // ✅ Native lazy loading
              className="w-full h-full object-cover"
              alt="Birthday memory"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCarousel;
