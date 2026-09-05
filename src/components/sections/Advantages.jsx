import React from 'react';
import { useTranslation } from 'react-i18next';

import advantageFleet from '../../assets/images/advantages/advantage-fleet.webp';
import advantageDelivery from '../../assets/images/advantages/advantage-delivery.webp';
import advantageInsurance from '../../assets/images/advantages/advantage-insurance.webp';
import advantagePrivacy from '../../assets/images/advantages/advantage-privacy.webp';
import advantageSupport from '../../assets/images/advantages/advantage-support.webp';
import advantagePackage from '../../assets/images/advantages/advantage-package.webp';

const advantagesList = [
  {
    id: 1,
    image: advantageFleet,
    titleKey: 'advantages.fleet',
    text: '40+ unique cars for rent from our fleet',
  },
  {
    id: 2,
    image: advantageDelivery,
    titleKey: 'advantages.delivery',
    text: 'Delivery and return of cars in Dubai 24/7',
  },
  {
    id: 3,
    image: advantageInsurance,
    titleKey: 'advantages.insurance',
    text: 'Insurance without a deductible for each car',
  },
  {
    id: 4,
    image: advantagePrivacy,
    titleKey: 'advantages.privacy',
    text: 'No video or audio recording in the car',
  },
  {
    id: 5,
    image: advantageSupport,
    titleKey: 'advantages.support',
    text: '24/7 technical support',
  },
  {
    id: 6,
    image: advantagePackage,
    titleKey: 'advantages.package',
    text: 'All models have a premium package',
  },
];

export const Advantages = () => {
  const { t } = useTranslation();

  return (
    <section id="advantages" className="relative w-full pt-16 md:pt-24 pb-0 bg-[#0d0f11] text-white">
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-white">
          {t('advantages.title', 'Advantages')}
        </h2>
      </div>

      {/* Desktop 3x2 Full-Width Edge-to-Edge Grid (0 gaps, 100% viewport width) */}
      <div className="hidden md:grid md:grid-cols-3 w-full border-t border-b border-[#23272d]/80">
        {advantagesList.map((item, index) => (
          <div
            key={item.id}
            className={`group relative w-full h-[220px] lg:h-[260px] xl:h-[300px] 2xl:h-[350px] overflow-hidden bg-[#141619] cursor-pointer border-b border-[#23272d]/80 ${
              index >= 3 ? 'md:border-b-0' : ''
            } ${(index + 1) % 3 !== 0 ? 'border-r border-[#23272d]/80' : ''}`}
          >
            {/* Background Car Photo with Inactive Dim / Active Hover Reveal */}
            <img
              src={item.image}
              alt={item.text}
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale contrast-125 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out select-none"
              loading="lazy"
              decoding="async"
            />

            {/* Bottom Gradient for Readable Typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Text in Bottom Left */}
            <div className="absolute left-6 lg:left-8 bottom-6 lg:bottom-8 right-6 lg:right-8 z-10">
              <p className="text-white font-bold text-base lg:text-lg leading-snug drop-shadow-md transition-transform duration-300 group-hover:translate-x-1">
                {t(item.titleKey, item.text)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View: High-End Dark Card with Glowing Cyan Bullets */}
      <div className="block md:hidden max-w-md mx-auto px-4 pb-16">
        <div className="rounded-2xl border border-[#23272d] bg-[#141619]/90 backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-2xl">
          {advantagesList.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-[0_0_8px_var(--color-brand-cyan,#29b6b6)] flex-shrink-0 mt-1.5" />
              <p className="text-white font-semibold text-base leading-snug">
                {t(item.titleKey, item.text)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;