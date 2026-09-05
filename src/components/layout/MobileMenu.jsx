import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronDown, Send, MessageCircle } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { CITIES_DATA } from '../../data/constants';
import logoImg from '../../assets/images/branding/logo.webp';
import logoSymbolImg from '../../assets/images/branding/logo-symbol.webp';
import heroBgImg from '../../assets/images/hero/hero-bg.webp';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { selectedCity, setSelectedCity, location } = useLocation();
  const [activeItem, setActiveItem] = useState('Car List');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Handle smooth open/close lifecycle and cinematic delays
  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      // Trigger entrance animation on next frame after mounting
      const frameId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
      return () => cancelAnimationFrame(frameId);
    } else {
      setIsAnimatingIn(false);
      timeoutId = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = 'unset';
      }, 450);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const currentLang = (i18n.language || 'en').toUpperCase().startsWith('RU') ? 'RU' : 'ENG';

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
    setIsLangOpen(false);
  };

  const navColumn1 = [
    { key: 'carList', defaultLabel: 'Car List', href: '#most-popular' },
    { key: 'yachtList', defaultLabel: 'Yacht list', href: '#special-offers' },
    { key: 'chauffeur', defaultLabel: 'Chauffeur', href: '#hero' },
    { key: 'conditions', defaultLabel: 'Conditions', href: '#advantages' },
  ];

  const navColumn2 = [
    { key: 'testimonials', defaultLabel: 'Testimonials', href: '#reviews' },
    { key: 'articles', defaultLabel: 'Articles', href: '#discount' },
    { key: 'aboutUs', defaultLabel: 'About Us', href: '#about-us' },
    { key: 'contacts', defaultLabel: 'Contacts', href: '#map-contact' },
  ];

  // For desktop layout (menu.jpg has Column 1 with 5 items, Column 2 with 3 items)
  const desktopCol1 = [
    { key: 'carList', defaultLabel: 'Car List', href: '#most-popular' },
    { key: 'yachtList', defaultLabel: 'Yacht list', href: '#special-offers' },
    { key: 'chauffeur', defaultLabel: 'Chauffeur', href: '#hero' },
    { key: 'conditions', defaultLabel: 'Conditions', href: '#advantages' },
    { key: 'testimonials', defaultLabel: 'Testimonials', href: '#reviews' },
  ];

  const desktopCol2 = [
    { key: 'articles', defaultLabel: 'Articles', href: '#discount' },
    { key: 'aboutUs', defaultLabel: 'About Us', href: '#about-us' },
    { key: 'contacts', defaultLabel: 'Contacts', href: '#map-contact' },
  ];

  const handleLinkClick = (e, href, label) => {
    setActiveItem(label);
    onClose();
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0a0c0e]/95 backdrop-blur-2xl flex flex-col justify-between text-white select-none overflow-hidden transition-all duration-500 ease-out ${
        isAnimatingIn ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'
      }`}
    >
      {/* Background Car Silhouette for authentic boutique aesthetic */}
      <img
        src={heroBgImg}
        alt="Background car"
        className={`absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none -z-10 mix-blend-luminosity transition-transform duration-1000 ease-out ${
          isAnimatingIn ? 'scale-100' : 'scale-110'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e] via-transparent to-[#0a0c0e]/80 pointer-events-none -z-10" />

      {/* Top Bar (matches Header height h-20 and horizontal padding exactly) */}
      <div
        className={`w-full h-20 flex items-center justify-between px-4 sm:px-8 md:px-12 z-10 transition-all duration-500 ease-out ${
          isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={{ transitionDelay: '80ms' }}
      >
        {/* Close Button (matches burger button positioning) */}
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white transition-colors cursor-pointer group flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300 stroke-[1.75]" />
          </button>
        </div>

        {/* Center Logo (matches Header logo positioning) */}
        <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          {/* Desktop Logo */}
          <img
            src={logoImg}
            alt="Trinity Car Rental"
            className="hidden md:block h-9 lg:h-10 w-auto object-contain"
          />
          {/* Mobile Logo */}
          <img
            src={logoSymbolImg}
            alt="Trinity Emblem"
            className="block md:hidden h-8 w-auto object-contain"
          />
        </div>

        {/* City and Language Selectors */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* City selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="flex items-center gap-1.5 text-xs lg:text-sm font-bold uppercase text-brand-cyan hover:text-white transition-colors py-1 cursor-pointer"
            >
              <span>{selectedCity}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-brand-cyan ${
                  isCityOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isCityOpen && (
              <div className="absolute right-0 mt-2.5 w-44 bg-[#141619] border border-[#23272d] rounded-2xl overflow-hidden shadow-2xl z-20 animate-in fade-in slide-in-from-top-2 duration-200">
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

          {/* Language selector */}
          <div className="relative">
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
              <div className="absolute right-0 mt-2.5 w-24 bg-[#141619] border border-[#23272d] rounded-xl overflow-hidden shadow-2xl z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    currentLang === 'ENG'
                      ? 'text-brand-cyan bg-white/5 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  ENG
                </button>
                <button
                  onClick={() => toggleLanguage('ru')}
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
      </div>

      {/* Menu Links Body with Cinematic Cascading Staggered Entrance */}
      <div className="max-w-4xl mx-auto w-full my-auto px-6 sm:px-10 md:px-12 py-6">
        {/* Desktop 2-column layout */}
        <div className="hidden md:grid grid-cols-2 gap-x-20 gap-y-8 items-start">
          <div className="flex flex-col gap-7">
            {desktopCol1.map((item, index) => {
              const label = t(`nav.${item.key}`, item.defaultLabel);
              const isActive = activeItem === item.defaultLabel;
              const delay = 120 + index * 70; // Cinematic staggered delay
              return (
                <div
                  key={item.key}
                  className="transition-all duration-600 ease-out"
                  style={{
                    opacity: isAnimatingIn ? 1 : 0,
                    transform: isAnimatingIn ? 'translateY(0px)' : 'translateY(28px)',
                    transitionDelay: `${delay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.defaultLabel)}
                    className="group relative inline-block text-3xl lg:text-4xl font-extrabold tracking-tight transition-all duration-300 cursor-pointer"
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/75 group-hover:text-white'
                      }`}
                    >
                      {label}
                    </span>
                    {isActive ? (
                      <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-brand-cyan shadow-[0_0_12px_var(--color-brand-cyan)] rounded-full" />
                    ) : (
                      <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-brand-cyan shadow-[0_0_10px_var(--color-brand-cyan)] rounded-full transition-all duration-300 group-hover:w-full" />
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-7">
            {desktopCol2.map((item, index) => {
              const label = t(`nav.${item.key}`, item.defaultLabel);
              const isActive = activeItem === item.defaultLabel;
              const delay = 120 + (5 + index) * 70; // Stagger continues into column 2
              return (
                <div
                  key={item.key}
                  className="transition-all duration-600 ease-out"
                  style={{
                    opacity: isAnimatingIn ? 1 : 0,
                    transform: isAnimatingIn ? 'translateY(0px)' : 'translateY(28px)',
                    transitionDelay: `${delay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.defaultLabel)}
                    className="group relative inline-block text-3xl lg:text-4xl font-extrabold tracking-tight transition-all duration-300 cursor-pointer"
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/75 group-hover:text-white'
                      }`}
                    >
                      {label}
                    </span>
                    {isActive ? (
                      <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-brand-cyan shadow-[0_0_12px_var(--color-brand-cyan)] rounded-full" />
                    ) : (
                      <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-brand-cyan shadow-[0_0_10px_var(--color-brand-cyan)] rounded-full transition-all duration-300 group-hover:w-full" />
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile 2-column layout */}
        <div className="grid md:hidden grid-cols-2 gap-x-6 gap-y-7 items-start">
          <div className="flex flex-col gap-6">
            {navColumn1.map((item, index) => {
              const label = t(`nav.${item.key}`, item.defaultLabel);
              const isActive = activeItem === item.defaultLabel;
              const delay = 120 + index * 65;
              return (
                <div
                  key={item.key}
                  className="transition-all duration-600 ease-out"
                  style={{
                    opacity: isAnimatingIn ? 1 : 0,
                    transform: isAnimatingIn ? 'translateY(0px)' : 'translateY(24px)',
                    transitionDelay: `${delay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.defaultLabel)}
                    className="group relative inline-block text-xl sm:text-2xl font-extrabold tracking-tight cursor-pointer"
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                      }`}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-brand-cyan shadow-[0_0_10px_var(--color-brand-cyan)] rounded-full" />
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-6">
            {navColumn2.map((item, index) => {
              const label = t(`nav.${item.key}`, item.defaultLabel);
              const isActive = activeItem === item.defaultLabel;
              const delay = 120 + (4 + index) * 65;
              return (
                <div
                  key={item.key}
                  className="transition-all duration-600 ease-out"
                  style={{
                    opacity: isAnimatingIn ? 1 : 0,
                    transform: isAnimatingIn ? 'translateY(0px)' : 'translateY(24px)',
                    transitionDelay: `${delay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.defaultLabel)}
                    className="group relative inline-block text-xl sm:text-2xl font-extrabold tracking-tight cursor-pointer"
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                      }`}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-brand-cyan shadow-[0_0_10px_var(--color-brand-cyan)] rounded-full" />
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Address, Phone & Socials (Animated entrance) */}
      <div
        className={`w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 py-6 border-t border-[#23272d]/60 text-xs sm:text-sm text-gray-400 gap-4 z-10 transition-all duration-500 ease-out ${
          isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="hidden md:block max-w-sm text-left font-light text-gray-400">
          {location.address}
        </div>

        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-5">
          <a
            href={`tel:${location.phoneRaw || '+971585907875'}`}
            className="text-white font-bold text-base sm:text-lg tracking-wide hover:text-brand-cyan transition-colors"
          >
            {location.phone}
          </a>

          <div className="flex items-center gap-2.5">
            {/* Telegram circular icon */}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#24a1de] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-md shadow-[#24a1de]/30 cursor-pointer"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
            </a>

            {/* WhatsApp circular icon */}
            <a
              href={`https://wa.me/${location.phoneRaw ? location.phoneRaw.replace('+', '') : '971585907875'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-md shadow-[#25d366]/30 cursor-pointer"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
