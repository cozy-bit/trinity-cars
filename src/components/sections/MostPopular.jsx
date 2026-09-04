import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { POPULAR_CARS_DATA } from '../../data/constants';
import defaultCarImg from '../../assets/images/most-popular-huracan.png';

export const MostPopular = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCarId, setSelectedCarId] = useState(
    POPULAR_CARS_DATA.find((c) => c.id === 'huracan-evo')?.id || POPULAR_CARS_DATA[0]?.id
  );
  const selectedItemRef = useRef(null);
  const listContainerRef = useRef(null);

  const filteredCars = POPULAR_CARS_DATA.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (car.model && car.model.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedCar =
    filteredCars.find((car) => car.id === selectedCarId) ||
    filteredCars[0] ||
    POPULAR_CARS_DATA[0];

  // Auto scroll to selected car in list if it's outside view
  useEffect(() => {
    if (selectedItemRef.current && listContainerRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedCarId]);

  const handlePrevCar = () => {
    if (!filteredCars.length) return;
    const currentIndex = filteredCars.findIndex((c) => c.id === selectedCar.id);
    if (currentIndex > 0) {
      setSelectedCarId(filteredCars[currentIndex - 1].id);
    } else {
      setSelectedCarId(filteredCars[filteredCars.length - 1].id);
    }
  };

  const handleNextCar = () => {
    if (!filteredCars.length) return;
    const currentIndex = filteredCars.findIndex((c) => c.id === selectedCar.id);
    if (currentIndex < filteredCars.length - 1) {
      setSelectedCarId(filteredCars[currentIndex + 1].id);
    } else {
      setSelectedCarId(filteredCars[0].id);
    }
  };

  return (
    <section id="most-popular" className="w-full py-16 md:py-24 px-6 md:px-12 bg-[#0d0f11]">
      <div className="max-w-7xl mx-auto">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Featured Car Photo Card */}
          <div className="lg:col-span-7 bg-[#141619] rounded-[28px] border border-[#23272d]/80 overflow-hidden relative shadow-2xl min-h-[440px] sm:min-h-[500px] lg:h-[540px] xl:h-[560px] flex flex-col justify-end group">
            {/* Background Car Image with smooth zoom & fade animation */}
            <img
              key={`img-${selectedCar.id}`}
              src={selectedCar.image || defaultCarImg}
              alt={selectedCar.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 select-none animate-car-image"
            />

            {/* Dark Gradient Overlay for optimal text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

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

          {/* Right Column: Title, Search, and Timeline Navigation List */}
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

            {/* Timeline & Car Items List */}
            <div className="relative flex items-stretch gap-7 pl-1 mt-2">
              {/* Left Vertical Track with Circular Top/Bottom Chevrons */}
              <div className="flex flex-col items-center justify-between w-8 py-1 select-none flex-shrink-0">
                <button
                  onClick={handlePrevCar}
                  className="w-8 h-8 rounded-full border border-[#2b2f38] bg-[#14161a] flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-cyan transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Previous car"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                {/* Continuous Vertical Axis Line */}
                <div className="w-[1.5px] flex-1 bg-[#262a32] my-3 relative rounded-full" />

                <button
                  onClick={handleNextCar}
                  className="w-8 h-8 rounded-full border border-[#2b2f38] bg-[#14161a] flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-cyan transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Next car"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Models List */}
              <div
                ref={listContainerRef}
                className="flex-1 flex flex-col gap-5 max-h-[360px] overflow-y-auto scrollbar-none py-2 pr-2"
              >
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => {
                    const isSelected = selectedCar.id === car.id;
                    return (
                      <div
                        key={car.id}
                        ref={isSelected ? selectedItemRef : null}
                        className="relative"
                      >
                        <button
                          onClick={() => setSelectedCarId(car.id)}
                          className="group relative flex flex-col text-left py-1 transition-all duration-300 cursor-pointer w-full focus:outline-none"
                        >
                          <span
                            className={`text-lg sm:text-xl font-bold tracking-tight transition-all duration-300 ${
                              isSelected
                                ? 'text-brand-cyan font-black scale-[1.02] origin-left'
                                : 'text-white/95 group-hover:text-white'
                            }`}
                          >
                            {car.brand}
                          </span>
                          <span
                            className={`text-xs sm:text-sm transition-all duration-300 mt-0.5 ${
                              isSelected
                                ? 'text-brand-cyan/90 font-medium'
                                : 'text-gray-500 group-hover:text-gray-400'
                            }`}
                          >
                            {car.model || car.name}
                          </span>
                        </button>

                        {/* Active timeline branch connector line + glowing dot */}
                        {isSelected && (
                          <div className="absolute -left-[43px] top-0 bottom-0 flex items-center pointer-events-none overflow-visible">
                            <svg
                              className="w-[300px] h-[58px] overflow-visible"
                              viewBox="0 0 300 58"
                              fill="none"
                            >
                              {/* Outer Cyan Glow Circle on the vertical line */}
                              <circle
                                cx="0"
                                cy="15"
                                r="5.5"
                                fill="#29b6b6"
                                className="drop-shadow-[0_0_8px_rgba(41,182,182,0.95)]"
                              />
                              {/* Inner White Dot */}
                              <circle cx="0" cy="15" r="2.5" fill="#ffffff" />
                              {/* Diagonal connector path extending into underline */}
                              <path
                                d="M 0 15 L 14 15 L 28 44 L 200 44"
                                stroke="#29b6b6"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="animate-connector-line drop-shadow-[0_0_6px_rgba(41,182,182,0.45)]"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-gray-500 text-sm">
                    No models found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>

            {/* VIEW ALL Button */}
            <div className="mt-8 pl-15">
              <button
                onClick={() => {
                  const specialOffersSection = document.getElementById('special-offers');
                  if (specialOffersSection) {
                    specialOffersSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-3.5 bg-brand-cyan hover:bg-brand-cyan-hover text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(41,182,182,0.4)] cursor-pointer active:scale-95"
              >
                {t('mostPopular.viewAll', 'VIEW ALL')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
