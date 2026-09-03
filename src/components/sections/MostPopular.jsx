import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { POPULAR_CARS_DATA } from '../../data/constants';
import defaultCarImg from '../../assets/images/most-popular-huracan.png';

export const MostPopular = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCarId, setSelectedCarId] = useState(POPULAR_CARS_DATA[0]?.id || 'huracan-evo');

  const filteredCars = POPULAR_CARS_DATA.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCar =
    POPULAR_CARS_DATA.find((car) => car.id === selectedCarId) || POPULAR_CARS_DATA[0];

  return (
    <section id="most-popular" className="w-full py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-8 md:mb-12 tracking-tight">
          {t('mostPopular.title', 'Most Popular')}
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Featured Car Card */}
          <div className="lg:col-span-7 bg-[#141619] rounded-2xl border border-[#23272d] overflow-hidden flex flex-col justify-between group shadow-xl relative min-h-[380px] sm:min-h-[460px]">
            {/* Car Image with subtle zoom on hover */}
            <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <img
                src={defaultCarImg}
                alt={selectedCar.name}
                className="w-full h-full max-h-[380px] object-contain transition-transform duration-500 group-hover:scale-105 select-none"
              />
            </div>

            {/* Bottom Details Bar */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-t from-[#141619] via-[#141619]/90 to-transparent z-10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {selectedCar.name}
                </h3>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  {selectedCar.brand}
                </span>
              </div>

              {/* Price Badge */}
              <div className="inline-flex items-baseline gap-1.5 bg-[#1b1e23]/90 border border-[#2b2f36] px-4 py-2 rounded-xl backdrop-blur-sm shadow-inner self-start sm:self-auto">
                <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {selectedCar.price}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {t('mostPopular.perDay', selectedCar.period || 'per day')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Selection List */}
          <div className="lg:col-span-5 bg-[#141619] rounded-2xl border border-[#23272d] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('mostPopular.searchPlaceholder', 'Car search')}
                  className="w-full bg-[#181a1d] text-white placeholder-gray-500 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none border border-[#2b2f36] hover:border-gray-600 focus:border-brand-cyan transition-colors"
                />
              </div>

              {/* Models List */}
              <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => {
                    const isSelected = selectedCar.id === car.id;
                    return (
                      <button
                        key={car.id}
                        onClick={() => setSelectedCarId(car.id)}
                        className={`flex items-center gap-3 w-full text-left py-3 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-white/[0.04] text-brand-cyan font-semibold'
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        {/* Active vertical indicator bar */}
                        <span
                          className={`w-1 h-5 rounded-full transition-all duration-200 ${
                            isSelected
                              ? 'bg-brand-cyan shadow-[0_0_8px_var(--color-brand-cyan)] scale-y-100'
                              : 'bg-transparent scale-y-50'
                          }`}
                        />
                        <span className="text-sm md:text-base tracking-wide flex-1">
                          {car.name}
                        </span>
                        {isSelected && (
                          <span className="text-xs font-semibold text-brand-cyan/80">
                            {car.price}
                          </span>
                        )}
                      </button>
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
            <div className="mt-6 pt-4 border-t border-[#23272d]/50">
              <Button
                variant="primary"
                className="w-full py-4 text-sm font-bold tracking-wider"
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
