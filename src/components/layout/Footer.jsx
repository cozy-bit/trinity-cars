import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MessageCircle, Check } from 'lucide-react';
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
import safetyPayImg from '../../assets/images/payments/safety-pay.png';
import cashImg from '../../assets/images/payments/cash.png';

export const Footer = () => {
  const { t } = useTranslation();
  const [activeBrand, setActiveBrand] = useState('Rolls-Royce');
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const brands = [
    'Rolls-Royce',
    'Cadillac',
    'Maserati',
    'Lamborghini',
    'Bentley',
    'BMW',
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
    { name: 'SafetyPay', img: safetyPayImg },
    { name: 'Cash', img: cashImg },
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
      {/* Brands Bar (Text-based with luxury typography and active cyan indicator) */}
      <section className="w-full bg-[#0d0f11] border-y border-[#23272d]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-2">
            {brands.map((brand) => {
              const isActive = activeBrand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`relative group shrink-0 transition-all duration-300 font-extrabold tracking-wider uppercase cursor-pointer select-none ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <span className="text-sm sm:text-base md:text-lg font-sans">
                    {brand}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-2.5 left-0 w-full h-[3px] bg-brand-cyan shadow-[0_0_10px_var(--color-brand-cyan)] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Footer Container */}
      <footer className="w-full bg-[#0d0f11] text-gray-400 pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          {/* Top Grid: Links & Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Column 1: For Customers */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">
                {t('footer.forCustomers', 'For Customers')}
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#about-us" className="hover:text-brand-cyan transition-colors">
                    {t('nav.aboutUs', 'About Us')}
                  </a>
                </li>
                <li>
                  <a href="#advantages" className="hover:text-brand-cyan transition-colors">
                    {t('nav.conditions', 'Conditions')}
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-brand-cyan transition-colors">
                    {t('nav.testimonials', 'Testimonials')}
                  </a>
                </li>
                <li>
                  <a href="#discount" className="hover:text-brand-cyan transition-colors">
                    {t('nav.articles', 'Articles')}
                  </a>
                </li>
                <li>
                  <a href="#map-contact" className="hover:text-brand-cyan transition-colors">
                    {t('nav.contacts', 'Contacts')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Car List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">
                {t('footer.carList', 'Car List')}
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#most-popular" className="hover:text-brand-cyan transition-colors">
                    Sport cars
                  </a>
                </li>
                <li>
                  <a href="#most-popular" className="hover:text-brand-cyan transition-colors">
                    Luxury
                  </a>
                </li>
                <li>
                  <a href="#most-popular" className="hover:text-brand-cyan transition-colors">
                    SUV
                  </a>
                </li>
                <li>
                  <a href="#most-popular" className="hover:text-brand-cyan transition-colors">
                    Convertible
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Service */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">
                {t('footer.service', 'Service')}
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#hero" className="hover:text-brand-cyan transition-colors">
                    Car rental Dubai
                  </a>
                </li>
                <li>
                  <a href="#special-offers" className="hover:text-brand-cyan transition-colors">
                    Rent yacht Dubai
                  </a>
                </li>
                <li>
                  <a href="#hero" className="hover:text-brand-cyan transition-colors">
                    Chauffeur service
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Newsletter */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              {/* Phone and Messenger buttons */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <a
                  href="tel:+971585907875"
                  className="text-white font-bold text-lg sm:text-xl tracking-wide hover:text-brand-cyan transition-colors"
                >
                  +971 58 590 7875
                </a>
                <div className="flex items-center gap-2">
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#24a1de] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
                    aria-label="Telegram"
                  >
                    <Send className="w-3.5 h-3.5 -translate-x-0.5 translate-y-0.5" />
                  </a>
                  <a
                    href="https://wa.me/971585907875"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
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
                  className="w-full sm:w-auto px-6 py-3 rounded-md border border-[#2b2f36] text-xs font-bold uppercase tracking-wider text-gray-200 hover:border-brand-cyan hover:text-brand-cyan transition-all cursor-pointer"
                >
                  {t('footer.requestCallback', 'REQUEST A CALLBACK')}
                </button>
              </div>

              {/* Address */}
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {t('footer.address', '24 4th St - Al Quoz - Al Quoz Industrial Area 3 - Dubai')}
              </p>

              {/* Newsletter subscribe */}
              <div className="mt-2">
                {newsletterSubscribed ? (
                  <div className="flex items-center gap-2 text-xs text-brand-cyan font-medium">
                    <Check className="w-4 h-4" />
                    <span>Subscribed successfully!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={t('footer.newsletterPlaceholder', 'Your email')}
                      className="flex-1 bg-[#181a1d] text-white placeholder-gray-500 rounded-md px-3.5 py-2.5 outline-none border border-[#2b2f36] hover:border-gray-600 focus:border-brand-cyan text-xs transition-colors"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="px-4 py-2.5 text-xs font-bold shrink-0"
                    >
                      {t('footer.subscribe', 'SUBSCRIBE')}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Payment Systems Row */}
          <div className="pt-8 border-t border-[#23272d]/80">
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-6">
              {paymentMethods.map((payment) => (
                <div
                  key={payment.name}
                  className="h-7 px-2.5 py-1 rounded bg-[#181a1d] border border-[#23272d] flex items-center justify-center hover:border-gray-500 transition-colors"
                  title={payment.name}
                >
                  <img
                    src={payment.img}
                    alt={payment.name}
                    className="h-4 sm:h-5 w-auto object-contain brightness-90 hover:brightness-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Copyright, Socials & Legal */}
          <div className="pt-6 border-t border-[#23272d]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>{t('footer.copyright', '© 2026 TRINITY. All rights reserved.')}</p>

            <div className="flex items-center gap-4">
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
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-cyan transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
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
            </div>

            <a href="#" className="hover:text-gray-300 transition-colors">
              {t('footer.privacyPolicy', 'Privacy Policy')}
            </a>
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
              onChange={(e) => setCallbackPhone(e.target.value)}
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
