import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronDown, Send, MessageCircle } from 'lucide-react';
import logoImg from '../../assets/images/logo.png';
import logoSymbolImg from '../../assets/images/logo-symbol.png';
import heroBgImg from '../../assets/images/hero-bg.png';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [activeItem, setActiveItem] = useState('Yacht list');
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 bg-[#0a0c0e]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:p-12 text-white animate-in fade-in duration-300 select-none overflow-hidden">
      {/* Background Car Silhouette for authentic boutique aesthetic */}
      <img
        src={heroBgImg}
        alt="Background car"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none -z-10 mix-blend-luminosity scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e] via-transparent to-[#0a0c0e]/80 pointer-events-none -z-10" />

      {/* Top Bar */}
      <div className="w-full flex items-center justify-between z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          aria-label="Close menu"
        >
          <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Center Logo */}
        <div className="flex items-center justify-center">
          {/* Desktop Logo */}
          <img
            src={logoImg}
            alt="Trinity Car Rental"
            className="hidden md:block h-10 w-auto object-contain"
          />
          {/* Mobile Logo */}
          <img
            src={logoSymbolImg}
            alt="Trinity"
            className="block md:hidden h-9 w-auto object-contain"
          />
        </div>

        {/* Language selector on mobile / placeholder on desktop */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-white/90 hover:text-brand-cyan transition-colors px-2 py-1 rounded"
          >
            <span>{currentLang}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180 text-brand-cyan' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-20 bg-[#141619] border border-[#23272d] rounded-lg py-1 shadow-2xl z-20">
              <button
                onClick={() => toggleLanguage('en')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                  currentLang === 'ENG' ? 'text-brand-cyan font-bold bg-white/5' : 'text-gray-300 hover:text-white'
                }`}
              >
                ENG
              </button>
              <button
                onClick={() => toggleLanguage('ru')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                  currentLang === 'RU' ? 'text-brand-cyan font-bold bg-white/5' : 'text-gray-300 hover:text-white'
                }`}
              >
                RU
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menu Links Body */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8">
        {/* Desktop 2-column layout (strictly follows menu.jpg) */}
        <div className="hidden md:grid grid-cols-2 gap-x-20 gap-y-8 items-start">
          <div className="flex flex-col gap-7">
            {desktopCol1.map((item) => {
              const label = t(`nav.${item.key}`, item.defaultLabel);
              const isActive = activeItem === item.defaultLabel;
              return (
                <div key={item.key}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.defaultLabel)}
                    className="group relative inline-block text-3xl lg:text-4xl font-extrabold tracking-tight transition-all duration-200"
                  >
                    <span className={isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}>
                      {label}
                    </span>
                    {isActive ? (
                      <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-brand-cyan shadow-[0_0_12px_var(--color-brand-cyan)] rounded-full" />
                    ) : (
                      <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-cyan/60 transition-all duration-300 group-hover:w-full" />
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-7">
            {desktopCol2.map((item) => {
              const label = t(`nav.${item.key}`, item.defaultLabel);
              const isActive = activeItem === item.defaultLabel;
              return (
                <div key={item.key}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.defaultLabel)}
                    className="group relative inline-block text-3xl lg:text-4xl font-extrabold tracking-tight transition-all duration-200"
                  >
                    <span className={isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}>
                      {label}
                    </span>
                    {isActive ? (
                      <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-brand-cyan shadow-[0_0_12px_var(--color-brand-cyan)] rounded-full" />
                    ) : (
                      <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-cyan/60 transition-all duration-300 group-hover:w-full" />
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile 2-column layout (strictly follows mobile menu.jpg) */}
        <div className="grid md:hidden grid-cols-2 gap-x-6 gap-y-7 items-start">
          <div className="flex flex-col gap-6">
            {navColumn1.map((item) => {
              const label = t(`nav.${item.key}`, item.defaultLabel);
              const isActive = activeItem === item.defaultLabel;
              return (
                <div key={item.key}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.defaultLabel)}
                    className="group relative inline-block text-xl sm:text-2xl font-extrabold tracking-tight"
                  >
                    <span className={isActive ? 'text-white' : 'text-white/85 group-hover:text-white'}>
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
            {navColumn2.map((item) => {
              const label = t(`nav.${item.key}`, item.defaultLabel);
              const isActive = activeItem === item.defaultLabel;
              return (
                <div key={item.key}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.defaultLabel)}
                    className="group relative inline-block text-xl sm:text-2xl font-extrabold tracking-tight"
                  >
                    <span className={isActive ? 'text-white' : 'text-white/85 group-hover:text-white'}>
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

      {/* Bottom Bar: Address, Phone & Socials */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[#23272d]/60 text-xs sm:text-sm text-gray-400 gap-4 z-10">
        <div className="hidden md:block max-w-sm text-left font-light text-gray-400">
          24 4th St - Al Quoz - Al Quoz Industrial Area 3 - Dubai
        </div>

        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-5">
          <a
            href="tel:+971585907875"
            className="text-white font-bold text-base sm:text-lg tracking-wide hover:text-brand-cyan transition-colors"
          >
            +971 58 590 7875
          </a>

          <div className="flex items-center gap-2.5">
            {/* Telegram circular icon */}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#24a1de] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-md shadow-[#24a1de]/30"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
            </a>

            {/* WhatsApp circular icon */}
            <a
              href="https://wa.me/971585907875"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-md shadow-[#25d366]/30"
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
