import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MessageCircle, Check } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

// Payment images
import visaImg from '../../assets/images/payments/visa.png';
import mastercardImg from '../../assets/images/payments/mastercard.png';
import amexImg from '../../assets/images/payments/american-express.png';
import unionPayImg from '../../assets/images/payments/union-pay.png';
import tetherImg from '../../assets/images/payments/tether.png';
import googlePayImg from '../../assets/images/payments/google-pay.png';
import applePayImg from '../../assets/images/payments/apple-pay.png';
import giroPayImg from '../../assets/images/payments/giro-pay.png';
import cashImg from '../../assets/images/payments/cash.png';
import safetyPayImg from '../../assets/images/payments/safety-pay.png';

export const Footer = () => {
  const { t } = useTranslation();
  const { location } = useLocation();
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const brands = [
    'Audi',
    'BMW',
    'Rolls-Royce',
    'Cadillac',
    'Maserati',
    'Lamborghini',
    'Bentley',
    'Porsche',
  ];

  const paymentMethods = [
    { name: 'Visa', img: visaImg },
    { name: 'Mastercard', img: mastercardImg },
    { name: 'American Express', img: amexImg },
    { name: 'UnionPay', img: unionPayImg },
    { name: 'Tether', img: tetherImg },
    { name: 'Google Pay', img: googlePayImg },
    { name: 'Apple Pay', img: applePayImg },
    { name: 'GiroPay', img: giroPayImg },
    { name: 'Cash', img: cashImg },
    { name: 'SafetyPay', img: safetyPayImg },
  ];

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!callbackPhone) return;
    setCallbackSent(true);
    setTimeout(() => {
      setCallbackSent(false);
      setIsCallbackOpen(false);
      setCallbackPhone('');
    }, 2500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <>
      {/* Brands Bar (Animated Marquee floating left-to-right, interactive) */}
      <section className="w-full bg-[#0d0f11] border-y border-[#23272d] overflow-hidden py-4 sm:py-6">
        <div className="relative w-full overflow-hidden">
          {/* Subtle gradient edge masks for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#0d0f11] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#0d0f11] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track: Smoothly floats from left to right */}
          <div className="flex items-center gap-8 md:gap-14 animate-marquee-left-to-right select-none py-1">
            {[...brands, ...brands, ...brands, ...brands].map((brand, i) => {
              const isDefaultHighlight = brand === 'Rolls-Royce' && (i === 2 || i === 10);
              return (
                <a
                  key={`${brand}-${i}`}
                  href="#most-popular"
                  className={`relative group shrink-0 transition-all duration-300 font-extrabold tracking-wider uppercase cursor-pointer select-none py-2 ${
                    isDefaultHighlight ? 'text-white' : 'text-[#3d424b] hover:text-white'
                  }`}
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-sans tracking-wide">
                    {brand}
                  </span>
                  {/* Glowing Cyan underline on hover or highlighted item */}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-[3px] bg-brand-cyan shadow-[0_0_12px_var(--color-brand-cyan)] rounded-full transition-transform duration-300 origin-left ${
                      isDefaultHighlight ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Footer Container */}
      <footer className="w-full bg-[#0d0f11] text-gray-400 pt-12 lg:pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* MOBILE LAYOUT (< 768px: 2-columns + centered contact) */}
          <div className="flex flex-col gap-10 md:hidden">
            {/* 2-Column Links Grid */}
            <div className="grid grid-cols-2 gap-8 items-start">
              {/* Left Column: For Customers + Service */}
              <div className="flex flex-col gap-8">
                {/* For Customers */}
                <div className="flex flex-col gap-3.5">
                  <h4 className="text-white font-bold text-sm sm:text-base tracking-tight">
                    {t('footer.forCustomers', 'For Customers')}
                  </h4>
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-400">
                    <li>
                      <a href="#about-us" className="hover:text-white transition-colors">
                        {t('nav.aboutUs', 'About Us')}
                      </a>
                    </li>
                    <li>
                      <a href="#advantages" className="hover:text-white transition-colors">
                        {t('nav.conditions', 'Conditions')}
                      </a>
                    </li>
                    <li>
                      <a href="#reviews" className="hover:text-white transition-colors">
                        {t('nav.testimonials', 'Testimonials')}
                      </a>
                    </li>
                    <li>
                      <a href="#discount" className="hover:text-white transition-colors">
                        {t('nav.articles', 'Articles')}
                      </a>
                    </li>
                    <li>
                      <a href="#map-contact" className="hover:text-white transition-colors">
                        {t('nav.contacts', 'Contacts')}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Service */}
                <div className="flex flex-col gap-3.5">
                  <h4 className="text-white font-bold text-sm sm:text-base tracking-tight">
                    {t('footer.service', 'Service')}
                  </h4>
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-400">
                    <li>
                      <a href="#hero" className="hover:text-white transition-colors">
                        Car List
                      </a>
                    </li>
                    <li>
                      <a href="#special-offers" className="hover:text-white transition-colors">
                        Yacht list
                      </a>
                    </li>
                    <li>
                      <a href="#hero" className="hover:text-white transition-colors">
                        Chauffeur
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Car List Categories */}
              <div className="flex flex-col gap-3.5">
                <h4 className="text-white font-bold text-sm sm:text-base tracking-tight">
                  {t('footer.carList', 'Car List')}
                </h4>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-400">
                  <li>
                    <a href="#most-popular" className="hover:text-white transition-colors">
                      SUVs
                    </a>
                  </li>
                  <li>
                    <a href="#most-popular" className="hover:text-white transition-colors">
                      Convertibles
                    </a>
                  </li>
                  <li>
                    <a href="#most-popular" className="hover:text-white transition-colors">
                      Sports Cars
                    </a>
                  </li>
                  <li>
                    <a href="#most-popular" className="hover:text-white transition-colors">
                      Premium
                    </a>
                  </li>
                  <li>
                    <a href="#most-popular" className="hover:text-white transition-colors">
                      Coupe
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Contact Block (Phone, Callback Button, Address, Socials) */}
            <div className="flex flex-col items-center text-center gap-6 pt-8 border-t border-[#23272d]/60">
              {/* Phone + Messengers */}
              <div className="flex items-center justify-center gap-3.5 flex-wrap">
                <a
                  href={`tel:${location.phoneRaw || '+971585907875'}`}
                  className="text-white font-extrabold text-2xl sm:text-3xl tracking-tight hover:text-brand-cyan transition-colors whitespace-nowrap"
                >
                  {location.phone}
                </a>
                <div className="flex items-center gap-2">
                  {/* Telegram */}
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#24a1de] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-md shadow-[#24a1de]/30"
                    aria-label="Telegram"
                  >
                    <Send className="w-4.5 h-4.5 -translate-x-0.5 translate-y-0.5" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${location.phoneRaw ? location.phoneRaw.replace('+', '') : '971585907875'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-md shadow-[#25d366]/30"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </a>
                </div>
              </div>

              {/* Full-width REQUEST A CALLBACK button */}
              <button
                onClick={() => setIsCallbackOpen(true)}
                className="w-full max-w-sm py-4 rounded-xl border-2 border-brand-cyan text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:bg-brand-cyan hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(41,182,182,0.15)] active:scale-98"
              >
                {t('footer.requestCallback', 'REQUEST A CALLBACK')}
              </button>

              {/* Address */}
              <div className="text-white font-bold text-sm sm:text-base leading-snug max-w-xs">
                <p>{location.address}</p>
              </div>

              {/* Social Icons Row */}
              <div className="flex items-center justify-center gap-6 pt-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cyan hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cyan hover:scale-110 transition-transform"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cyan hover:scale-110 transition-transform"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cyan hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>

              {/* Copyright */}
              <p className="text-xs text-gray-500 pt-1">
                {t('footer.copyright', '©2023 TRINITY. All rights reserved')}
              </p>

              {/* Privacy Policy */}
              <a href="#" className="text-brand-cyan hover:underline transition-colors font-medium text-xs">
                {t('footer.privacyPolicy', 'Privacy Policy')}
              </a>
            </div>
          </div>

          {/* TABLET & DESKTOP LAYOUT (>= 768px) */}
          <div className="hidden md:flex flex-col gap-10 lg:gap-14">
            {/* Top Grid: Links (Left 7 cols) & Contacts/Newsletter (Right 5 cols) */}
            <div className="grid grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-start">
              {/* Left Side: 3 Columns of Navigation Links */}
              <div className="col-span-7 grid grid-cols-3 gap-4 lg:gap-8">
                {/* Column 1: For Customers */}
                <div className="flex flex-col gap-3.5">
                  <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider mb-1 whitespace-nowrap">
                    {t('footer.forCustomers', 'For Customers')}
                  </h4>
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-400">
                    <li className="whitespace-nowrap">
                      <a href="#about-us" className="hover:text-white transition-colors">
                        {t('nav.aboutUs', 'About Us')}
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#advantages" className="hover:text-white transition-colors">
                        {t('nav.conditions', 'Conditions')}
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#reviews" className="hover:text-white transition-colors">
                        {t('nav.testimonials', 'Testimonials')}
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#discount" className="hover:text-white transition-colors">
                        {t('nav.articles', 'Articles')}
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#map-contact" className="hover:text-white transition-colors">
                        {t('nav.contacts', 'Contacts')}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Car List */}
                <div className="flex flex-col gap-3.5">
                  <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider mb-1 whitespace-nowrap">
                    {t('footer.carList', 'Car List')}
                  </h4>
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-400">
                    <li className="whitespace-nowrap">
                      <a href="#most-popular" className="hover:text-white transition-colors">
                        SUVs
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#most-popular" className="hover:text-white transition-colors">
                        Convertibles
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#most-popular" className="hover:text-white transition-colors">
                        Sports Cars
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#most-popular" className="hover:text-white transition-colors">
                        Premium
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#most-popular" className="hover:text-white transition-colors">
                        Coupe
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Service */}
                <div className="flex flex-col gap-3.5">
                  <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider mb-1 whitespace-nowrap">
                    {t('footer.service', 'Service')}
                  </h4>
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-400">
                    <li className="whitespace-nowrap">
                      <a href="#hero" className="hover:text-white transition-colors">
                        Car List
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#special-offers" className="hover:text-white transition-colors">
                        Yacht list
                      </a>
                    </li>
                    <li className="whitespace-nowrap">
                      <a href="#hero" className="hover:text-white transition-colors">
                        Chauffeur
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 4: Contact & Newsletter (Right Block - 5 cols) */}
              <div className="col-span-5 flex flex-col gap-5 lg:gap-6 border-l border-[#23272d]/80 pl-6 lg:pl-10">
                {/* Phone and Colored Messenger Icons */}
                <div className="flex items-center gap-3 flex-wrap xl:flex-nowrap">
                  <a
                    href={`tel:${location.phoneRaw || '+971585907875'}`}
                    className="text-white font-extrabold text-xl lg:text-2xl xl:text-3xl tracking-tight hover:text-brand-cyan transition-colors whitespace-nowrap"
                  >
                    {location.phone}
                  </a>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Telegram Blue Icon */}
                    <a
                      href="https://t.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#24a1de] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-md shadow-[#24a1de]/30"
                      aria-label="Telegram"
                    >
                      <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
                    </a>

                    {/* WhatsApp Green Icon */}
                    <a
                      href={`https://wa.me/${location.phoneRaw ? location.phoneRaw.replace('+', '') : '971585907875'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-md shadow-[#25d366]/30"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>

                {/* REQUEST A CALLBACK Button */}
                <div>
                  <button
                    onClick={() => setIsCallbackOpen(true)}
                    className="px-6 lg:px-8 py-3 lg:py-3.5 rounded-lg border border-brand-cyan text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-cyan hover:text-black transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(41,182,182,0.35)] active:scale-95 text-center"
                  >
                    {t('footer.requestCallback', 'REQUEST A CALLBACK')}
                  </button>
                </div>

                {/* Address */}
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base leading-snug">
                  <p>{location.address}</p>
                </div>

                {/* Newsletter subscribe */}
                <div>
                  {newsletterSubscribed ? (
                    <div className="flex items-center gap-2 text-xs text-brand-cyan font-medium py-3">
                      <Check className="w-4 h-4" />
                      <span>Subscribed successfully!</span>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleNewsletterSubmit}
                      className="bg-[#14161a] border border-[#252830] rounded-xl flex items-center p-1.5 focus-within:border-brand-cyan transition-colors max-w-md w-full"
                    >
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder={t('footer.newsletterPlaceholder', 'Write your E-mail')}
                        className="flex-1 bg-transparent text-white placeholder-gray-500 px-3 sm:px-4 py-2 outline-none text-xs sm:text-sm min-w-0"
                      />
                      <button
                        type="submit"
                        className="px-4 sm:px-6 py-2 bg-brand-cyan hover:bg-brand-cyan-hover text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all active:scale-95 shadow-md shrink-0 cursor-pointer"
                      >
                        {t('footer.subscribe', 'SUBMIT')}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Systems Row (Monochrome/seamless) */}
            <div className="pt-8 border-t border-[#23272d]/80">
              <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
                {paymentMethods.map((payment) => (
                  <img
                    key={payment.name}
                    src={payment.img}
                    alt={payment.name}
                    className="h-4 sm:h-5 w-auto object-contain opacity-40 hover:opacity-100 grayscale brightness-125 contrast-125 transition-opacity duration-300 select-none"
                  />
                ))}
              </div>
            </div>

            {/* Bottom Bar: Copyright, Socials & Legal */}
            <div className="pt-6 border-t border-[#23272d]/50 flex items-center justify-between gap-4 text-xs text-gray-500">
              {/* Left: Privacy Policy */}
              <a href="#" className="text-brand-cyan hover:underline transition-colors font-medium">
                {t('footer.privacyPolicy', 'Privacy Policy')}
              </a>

              {/* Center: Copyright */}
              <p>{t('footer.copyright', '©2023 TRINITY. All rights reserved')}</p>

              {/* Right: Social Media Icons */}
              <div className="flex items-center gap-5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Request a Callback Modal */}
      <Modal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        title="Request a Callback"
      >
        {callbackSent ? (
          <div className="py-6 text-center flex flex-col items-center">
            <Check className="w-12 h-12 text-brand-cyan mb-3" />
            <p className="text-white font-medium text-base">We will call you back shortly!</p>
          </div>
        ) : (
          <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-4">
            <p className="text-xs text-gray-400">
              Leave your phone number and our personal concierge will contact you within 5 minutes.
            </p>
            <Input
              type="tel"
              required
              placeholder="+971 -- --- ----"
              value={callbackPhone}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
                setCallbackPhone(onlyNumbers);
              }}
            />
            <Button type="submit" variant="primary" className="w-full py-3 mt-2 font-bold">
              SUBMIT
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
};
