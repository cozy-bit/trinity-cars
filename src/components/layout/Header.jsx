import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { CITIES_DATA } from '../../data/constants';
import { useLocation } from '../../context/LocationContext';
import { MobileMenu } from './MobileMenu';
import logoImg from '../../assets/images/logo.png';
import logoSymbolImg from '../../assets/images/logo-symbol.png';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { selectedCity, setSelectedCity, location } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('yachtList');
  const [isScrolled, setIsScrolled] = useState(false);

  const cityDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);
  const navRefs = useRef({});
  const [navIndicatorStyle, setNavIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const currentLang = (i18n.language || 'en').toUpperCase().startsWith('RU') ? 'RU' : 'ENG';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothly track active nav link indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = navRefs.current[activeNav];
      if (activeEl) {
        setNavIndicatorStyle({
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
  }, [activeNav, i18n.language]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target)) {
        setIsCityOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
    setIsLangOpen(false);
  };

  const navItems = [
    { key: 'carList', defaultLabel: 'Car List', href: '#most-popular' },
    { key: 'yachtList', defaultLabel: 'Yacht list', href: '#special-offers' },
    { key: 'chauffeur', defaultLabel: 'Chauffeur', href: '#hero' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-20 flex items-center justify-between px-4 sm:px-8 md:px-12 text-white border-b ${
          isMenuOpen
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        } ${
          isScrolled
            ? 'bg-[#0d0f11]/90 backdrop-blur-md border-[#23272d]/80 shadow-lg shadow-black/20'
            : 'bg-black/30 backdrop-blur-sm border-[#23272d]/30'
        }`}
      >
        {/* Left: Burger Button & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Burger Menu Button (2 lines, top line longer) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col gap-1.5 p-2 focus:outline-none group cursor-pointer"
            aria-label="Open navigation menu"
          >
            <span className="w-7 h-[2px] bg-white rounded-full transition-all duration-200 group-hover:bg-brand-cyan group-hover:w-8" />
            <span className="w-4.5 h-[2px] bg-white rounded-full transition-all duration-200 group-hover:bg-brand-cyan group-hover:w-8" />
          </button>

          {/* Desktop Navigation Links with Smooth Sliding Indicator */}
          <nav className="relative hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              return (
                <a
                  key={item.key}
                  ref={(el) => (navRefs.current[item.key] = el)}
                  href={item.href}
                  onClick={() => setActiveNav(item.key)}
                  className={`relative py-1 transition-colors duration-200 hover:text-white ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  <span>{t(`nav.${item.key}`, item.defaultLabel)}</span>
                </a>
              );
            })}

            {/* Smooth Sliding Glow Line */}
            <span
              className="absolute -bottom-1 h-[2px] bg-brand-cyan shadow-[0_0_10px_var(--color-brand-cyan)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={{
                left: `${navIndicatorStyle.left}px`,
                width: `${navIndicatorStyle.width}px`,
                opacity: navIndicatorStyle.opacity,
              }}
            />
          </nav>
        </div>

        {/* Center: Trinity Logo */}
        <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <a href="#" className="flex items-center transition-opacity hover:opacity-90">
            {/* Desktop Full Logo */}
            <img
              src={logoImg}
              alt="Trinity Car Rental"
              className="hidden md:block h-9 lg:h-10 w-auto object-contain"
            />
            {/* Mobile / Tablet Emblem */}
            <img
              src={logoSymbolImg}
              alt="Trinity Emblem"
              className="block md:hidden h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right: Phone, City Selector & Language Switcher */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Phone Number (Desktop only) */}
          <a
            href={`tel:${location.phoneRaw || '+971585907875'}`}
            className="hidden md:block text-xs lg:text-sm font-semibold tracking-wide text-white hover:text-brand-cyan transition-colors"
          >
            {location.phone}
          </a>

          {/* City Dropdown (Desktop & Tablet) */}
          <div className="relative hidden sm:block" ref={cityDropdownRef}>
            <button
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="flex items-center gap-1.5 text-xs lg:text-sm uppercase tracking-wider font-bold text-brand-cyan hover:text-white transition-colors py-1 cursor-pointer"
            >
              <span>{selectedCity}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-brand-cyan ${
                  isCityOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isCityOpen && (
              <div className="absolute right-0 mt-2.5 w-44 bg-[#141619] border border-[#23272d] rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {CITIES_DATA.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                      selectedCity === city
                        ? 'text-brand-cyan bg-white/5 font-bold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 text-xs lg:text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-brand-cyan transition-colors py-1 cursor-pointer"
            >
              <span>{currentLang}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isLangOpen ? 'rotate-180 text-brand-cyan' : ''
                }`}
              />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2.5 w-24 bg-[#141619] border border-[#23272d] rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => changeLang('en')}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    currentLang === 'ENG'
                      ? 'text-brand-cyan bg-white/5 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  ENG
                </button>
                <button
                  onClick={() => changeLang('ru')}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    currentLang === 'RU'
                      ? 'text-brand-cyan bg-white/5 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  RU
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile / Tablet Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
