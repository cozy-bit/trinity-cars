import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

import review1 from '../../assets/images/reviews/review-1.png';
import review2 from '../../assets/images/reviews/review-2.png';
import review3 from '../../assets/images/reviews/review-3.png';
import review4 from '../../assets/images/reviews/review-4.png';

const reviewsData = [
  {
    id: 1,
    image: review1,
    alt: 'Trinity Luxury Car Review 1',
  },
  {
    id: 2,
    image: review2,
    alt: 'Trinity Luxury Car Review 2',
  },
  {
    id: 3,
    image: review3,
    alt: 'Trinity Luxury Car Review 3',
  },
  {
    id: 4,
    image: review4,
    alt: 'Trinity Luxury Car Review 4',
  },
];

export const Reviews = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="reviews" className="relative w-full py-16 md:py-24 bg-[#0d0f11] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10 md:mb-12 text-center text-white">
          {t('reviews.title', 'Reviews')}
        </h2>

        {/* Reviews Cards: Desktop 4 in a row, Mobile horizontal swiper */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 md:grid md:grid-cols-4 gap-4 lg:gap-5 no-scrollbar scrollbar-none"
        >
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="group relative flex-shrink-0 w-[72vw] sm:w-[48vw] md:w-auto snap-center rounded-2xl overflow-hidden bg-[#141619] border border-[#23272d] aspect-[9/15] md:aspect-[9/15] lg:aspect-[9/15] shadow-xl select-none cursor-pointer transition-all duration-300 hover:border-brand-cyan/40"
            >
              {/* Review Photo */}
              <img
                src={review.image}
                alt={review.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                loading="lazy"
              />

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none group-hover:opacity-75 transition-opacity" />

              {/* Center Cyan Play Button (appears on hover) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-brand-cyan text-black flex items-center justify-center shadow-[0_0_22px_var(--color-brand-cyan,#29b6b6)] transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110">
                  <Play className="w-6 h-6 fill-black text-black ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-8 md:hidden">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Previous review"
            className="w-11 h-11 rounded-full border border-[#23272d] bg-[#141619] flex items-center justify-center text-gray-300 hover:text-brand-cyan hover:border-brand-cyan active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Next review"
            className="w-11 h-11 rounded-full border border-[#23272d] bg-[#141619] flex items-center justify-center text-gray-300 hover:text-brand-cyan hover:border-brand-cyan active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
