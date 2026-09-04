import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

export const SpecialOffers = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('special');
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const tabs = [
    { key: 'special', label: t('specialOffers.tabs.special', 'Special Offer') },
    { key: 'new', label: t('specialOffers.tabs.new', 'New car') },
    { key: 'popular', label: t('specialOffers.tabs.popular', 'Most popular') },
    { key: 'daily', label: t('specialOffers.tabs.daily', 'Daily') },
  ];

  // Smoothly measure and update tab underline indicator position & width
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = tabRefs.current[activeTab];
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    const frameId = requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab, i18n.language]);

  const offersData = {
    special: [
      {
        id: 'so-urus',
        name: 'Lamborghini Urus',
        image: '/images/cars/lamborghini-urus.png',
      },
      {
        id: 'so-roma',
        name: 'Ferrari Roma',
        image: '/images/cars/ferrari-roma.png',
      },
      {
        id: 'so-ghost',
        name: 'Rolls-Royce Ghost',
        image: '/images/cars/rolls-royce-ghost.png',
      },
      {
        id: 'so-porsche',
        name: 'Porsche 911 Turbo S',
        image: '/images/cars/porsche-911.png',
      },
    ],
    new: [
      {
        id: 'new-rs6',
        name: 'Audi RS6 Avant',
        image: '/images/cars/audi-rs6.png',
      },
      {
        id: 'new-huracan',
        name: 'Lamborghini Huracan EVO',
        image: '/images/cars/lamborghini-huracan-evo.png',
      },
      {
        id: 'new-bentley',
        name: 'Bentley Continental GT',
        image: '/images/cars/bentley-continental-gt.png',
      },
      {
        id: 'new-g63',
        name: 'Mercedes-Benz G63 AMG',
        image: '/images/cars/mercedes-g63-amg.png',
      },
    ],
    popular: [
      {
        id: 'pop-huracan',
        name: 'Lamborghini Huracan EVO',
        image: '/images/cars/lamborghini-huracan-evo.png',
      },
      {
        id: 'pop-ghost',
        name: 'Rolls-Royce Ghost',
        image: '/images/cars/rolls-royce-ghost.png',
      },
      {
        id: 'pop-roma',
        name: 'Ferrari Roma',
        image: '/images/cars/ferrari-roma.png',
      },
      {
        id: 'pop-porsche',
        name: 'Porsche 911 Turbo S',
        image: '/images/cars/porsche-911.png',
      },
    ],
    daily: [
      {
        id: 'daily-rs6',
        name: 'Audi RS6 Avant',
        image: '/images/cars/audi-rs6.png',
      },
      {
        id: 'daily-g63',
        name: 'Mercedes-Benz G63 AMG',
        image: '/images/cars/mercedes-g63-amg.png',
      },
      {
        id: 'daily-bentley',
        name: 'Bentley Continental GT',
        image: '/images/cars/bentley-continental-gt.png',
      },
      {
        id: 'daily-urus',
        name: 'Lamborghini Urus',
        image: '/images/cars/lamborghini-urus.png',
      },
    ],
  };

  const currentCars = offersData[activeTab] || offersData.special;

  return (
    <section id="special-offers" className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-[#0d0f11]">
      <div className="max-w-7xl mx-auto">
        {/* Top Tabs Filter with Smooth Sliding Glow Bar */}
        <div className="relative flex items-center gap-6 sm:gap-10 border-b border-[#23272d] pb-3 mb-8 md:mb-12 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                ref={(el) => (tabRefs.current[tab.key] = el)}
                onClick={() => setActiveTab(tab.key)}
                className={`relative pb-3 text-sm sm:text-base tracking-wide transition-colors duration-300 cursor-pointer whitespace-nowrap focus:outline-none ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-gray-500 hover:text-gray-300 font-medium'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Smooth Sliding Glowing Underline Bar */}
          <span
            className="absolute bottom-[-1px] h-[2.5px] bg-brand-cyan shadow-[0_0_14px_var(--color-brand-cyan)] rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
        </div>

        {/* 2x2 Car Cards Grid */}
        <div
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 animate-car-image"
        >
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="group relative rounded-2xl overflow-hidden bg-[#141619] border border-[#23272d]/80 aspect-[16/10] shadow-xl"
            >
              {/* Car Background Image */}
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
              />

              {/* Bottom Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Bottom Card Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8 flex items-center justify-between gap-4 z-10">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                  {car.name}
                </h3>

                <button
                  className="border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-black text-xs font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-md transition-all duration-200 cursor-pointer uppercase tracking-wider active:scale-95 shadow-sm hover:shadow-[0_0_14px_rgba(41,182,182,0.4)]"
                  onClick={() => {
                    const contactsSection = document.getElementById('contacts') || document.getElementById('map-contact');
                    if (contactsSection) {
                      contactsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {t('buttons.rent', 'RENT')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom VIEW ALL Button */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <Button
            variant="primary"
            className="px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-xl text-black shadow-lg hover:shadow-[0_0_24px_var(--color-brand-cyan-glow)] active:scale-95"
            onClick={() => {
              const mostPopularSection = document.getElementById('most-popular');
              if (mostPopularSection) {
                mostPopularSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t('buttons.viewAll', 'VIEW ALL')}
          </Button>
        </div>
      </div>
    </section>
  );
};
