import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { POPULAR_CARS_DATA } from '../../data/constants';
import defaultCarImg from '../../assets/images/most-popular/most-popular-huracan.webp';

const ITEM_HEIGHT = 76; // Height of each car item in px
const CONTAINER_HEIGHT = 380; // Total height of the carousel viewport
const CENTER_OFFSET = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2; // Vertical center offset (152px)

export const MostPopular = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCarId, setSelectedCarId] = useState(
    POPULAR_CARS_DATA.find((c) => c.id === 'huracan-evo')?.id || POPULAR_CARS_DATA[0]?.id
  );
  const activeModelRef = useRef(null);
  const [modelLineWidth, setModelLineWidth] = useState(70);

  const filteredCars = useMemo(() => {
    return POPULAR_CARS_DATA.filter((car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (car.model && car.model.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  // Keep selected car valid when filtered
  useEffect(() => {
    if (filteredCars.length > 0) {
      const exists = filteredCars.some((c) => c.id === selectedCarId);
      if (!exists) {
        setSelectedCarId(filteredCars[0].id);
      }
    }
  }, [filteredCars, selectedCarId]);

  const activeIndex = useMemo(() => {
    const idx = filteredCars.findIndex((c) => c.id === selectedCarId);
    return idx >= 0 ? idx : 0;
  }, [filteredCars, selectedCarId]);

  const selectedCar = filteredCars[activeIndex] || POPULAR_CARS_DATA[0];

  // Dynamically measure active car model text length for pixel-perfect line matching
  useEffect(() => {
    const updateLineWidth = () => {
      if (activeModelRef.current) {
        const width = activeModelRef.current.offsetWidth;
        if (width > 0) {
          setModelLineWidth(width);
        }
      }
    };

    updateLineWidth();
    const frameId = requestAnimationFrame(updateLineWidth);
    return () => cancelAnimationFrame(frameId);
  }, [selectedCarId, searchQuery, filteredCars]);

  const handlePrevCar = () => {
    if (filteredCars.length === 0) return;
    const nextIdx = activeIndex === 0 ? filteredCars.length - 1 : activeIndex - 1;
    setSelectedCarId(filteredCars[nextIdx].id);
  };

  const handleNextCar = () => {
    if (filteredCars.length === 0) return;
    const nextIdx = (activeIndex + 1) % filteredCars.length;
    setSelectedCarId(filteredCars[nextIdx].id);
  };

  return (
    <section id="most-popular" className="w-full pt-6 sm:pt-10 md:pt-14 pb-16 md:pb-24 px-6 md:px-12 bg-[#0d0f11]">
      <div className="max-w-7xl mx-auto">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Featured Car Photo Card with Crisp Rounded Corners on all 4 sides */}
          <div className="lg:col-span-7 bg-[#141619] rounded-[28px] border border-[#2c313a] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.7)] min-h-[440px] sm:min-h-[500px] lg:h-[540px] xl:h-[560px] flex flex-col justify-end group isolate">
            {/* Background Car Image with smooth zoom & fade animation */}
            <img
              key={`img-${selectedCar.id}`}
              src={selectedCar.image || defaultCarImg}
              alt={selectedCar.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover rounded-[28px] transition-opacity duration-300 select-none animate-car-image"
            />

            {/* Dark Gradient Overlay for optimal text readability */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-[#090b0d]/90 via-[#090b0d]/35 to-transparent pointer-events-none" />

            {/* Bottom Content Overlay */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
              {/* Car Title (Brand + Model) */}
              <div key={`title-${selectedCar.id}`} className="animate-car-title">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                  {t('mostPopular.rent', 'Rent')} {selectedCar.brand}
                </h3>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mt-0.5 sm:mt-1 drop-shadow-md">
                  {selectedCar.model || selectedCar.name}
                </p>
              </div>

              {/* Price Details */}
              <div key={`price-${selectedCar.id}`} className="animate-car-price text-left sm:text-right flex flex-col sm:items-end">
                <span className="text-xs sm:text-sm text-gray-300 font-medium tracking-wide drop-shadow">
                  {t('mostPopular.rentFrom', 'Rent is from aed')}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight my-0.5 drop-shadow-md">
                  {selectedCar.price}
                </span>
                <span className="text-xs text-gray-400 font-medium drop-shadow">
                  {t('mostPopular.perDay', selectedCar.period || 'per day')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Search, and Ferris Wheel Interactive Navigation */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Section Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              {t('mostPopular.title', 'Most Popular')}
            </h2>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('mostPopular.searchPlaceholder', 'Car search')}
                className="w-full bg-[#16181c] text-white placeholder-gray-500 rounded-xl px-4 py-3.5 pr-11 text-sm outline-none border border-[#262a31] hover:border-gray-600 focus:border-brand-cyan transition-colors"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Wheel Arc Navigation Container */}
            <div
              className="relative flex items-center gap-6 select-none pl-1"
              style={{ height: `${CONTAINER_HEIGHT}px` }}
            >
              {/* Left Vertical Track with Top/Bottom Chevrons & Center Indicator Line */}
              <div className="relative flex flex-col items-center justify-between h-full w-8 py-1 flex-shrink-0 z-20">
                {/* Top Chevron Button */}
                <button
                  onClick={handlePrevCar}
                  className="w-8 h-8 rounded-full border border-[#2b2f38] bg-[#14161a] flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-cyan transition-all cursor-pointer shadow-sm active:scale-95 z-30"
                  aria-label="Previous car"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                {/* Continuous Vertical Axis Line */}
                <div className="w-[2px] flex-1 bg-[#23272d] my-3 relative rounded-full" />

                {/* Bottom Chevron Button */}
                <button
                  onClick={handleNextCar}
                  className="w-8 h-8 rounded-full border border-[#2b2f38] bg-[#14161a] flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-cyan transition-all cursor-pointer shadow-sm active:scale-95 z-30"
                  aria-label="Next car"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Central Anchor Indicator Dot on Vertical Axis */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-30"
                  style={{ top: `${CENTER_OFFSET + 18}px` }}
                >
                  {/* Glowing Cyan Dot with white center */}
                  <div className="w-4 h-4 rounded-full bg-brand-cyan shadow-[0_0_12px_var(--color-brand-cyan)] border-2 border-[#0d0f11] flex items-center justify-center -translate-x-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Connected Bracket/Underline Line extending to the exact length of the car model */}
                <div
                  className="absolute pointer-events-none z-10"
                  style={{
                    top: `${CENTER_OFFSET + 25}px`,
                    left: '15px',
                  }}
                >
                  <svg
                    className="h-[50px] overflow-visible"
                    style={{ width: `${Math.max(50, 32 + modelLineWidth + 10)}px` }}
                    viewBox={`0 0 ${Math.max(50, 32 + modelLineWidth + 10)} 50`}
                    fill="none"
                  >
                    <path
                      d={`M 0 0 L 32 32 L ${32 + modelLineWidth + 6} 32`}
                      stroke="#27353a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300 ease-out"
                    />
                    <path
                      d={`M 0 0 L 32 32 L ${32 + modelLineWidth + 6} 32`}
                      stroke="#29b6b6"
                      strokeWidth="1.5"
                      strokeOpacity="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300 ease-out"
                    />
                  </svg>
                </div>
              </div>

              {/* Items Viewport with Fade Gradients and Wheel Arc Translation */}
              <div className="relative flex-1 h-full overflow-hidden">
                {/* Top Gradient Fade */}
                <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#0d0f11] to-transparent pointer-events-none z-10" />

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0d0f11] to-transparent pointer-events-none z-10" />

                {/* Sliding Items Container (Translates vertically to center active item) */}
                <div
                  className="relative w-full transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateY(${CENTER_OFFSET - activeIndex * ITEM_HEIGHT}px)`,
                  }}
                >
                  {filteredCars.length > 0 ? (
                    filteredCars.map((car, idx) => {
                      const dist = Math.abs(idx - activeIndex);
                      const isSelected = idx === activeIndex;

                      // Half-wheel arc shift (curved rightwards based on distance)
                      const offsetX = dist === 0 ? 0 : dist === 1 ? 28 : dist === 2 ? 56 : dist === 3 ? 84 : 110;
                      const opacity = dist === 0 ? 1 : dist === 1 ? 0.6 : dist === 2 ? 0.35 : dist === 3 ? 0.15 : 0.05;
                      const scale = dist === 0 ? 1.05 : dist === 1 ? 0.96 : dist === 2 ? 0.88 : 0.8;

                      return (
                        <div
                          key={car.id}
                          className="flex items-center"
                          style={{
                            height: `${ITEM_HEIGHT}px`,
                          }}
                        >
                          <button
                            onClick={() => setSelectedCarId(car.id)}
                            className="group relative flex flex-col text-left transition-all duration-500 ease-out cursor-pointer origin-left focus:outline-none"
                            style={{
                              transform: `translateX(${offsetX}px) scale(${scale})`,
                              opacity: opacity,
                            }}
                          >
                            <span
                              className={`text-xl sm:text-2xl font-black tracking-tight transition-colors duration-300 ${
                                isSelected
                                  ? 'text-brand-cyan drop-shadow-[0_0_12px_rgba(41,182,182,0.35)]'
                                  : 'text-white/90 group-hover:text-white'
                              }`}
                            >
                              {car.brand}
                            </span>
                            <span
                              ref={isSelected ? activeModelRef : null}
                              className={`text-xs sm:text-sm font-medium transition-colors duration-300 mt-0.5 inline-block w-fit ${
                                isSelected
                                  ? 'text-brand-cyan font-bold'
                                  : 'text-gray-400 group-hover:text-gray-300'
                              }`}
                            >
                              {car.model || car.name}
                            </span>
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-20 text-center text-gray-500 text-sm">
                      No models found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VIEW ALL Button */}
            <div className="mt-8 pl-14">
              <Button
                variant="primary"
                className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl text-white shadow-lg hover:shadow-[0_0_20px_rgba(41,182,182,0.4)]"
                onClick={() => {
                  const specialOffersSection = document.getElementById('special-offers');
                  if (specialOffersSection) {
                    specialOffersSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('mostPopular.viewAll', 'VIEW ALL')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

