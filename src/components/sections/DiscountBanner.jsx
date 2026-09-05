import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import radialLeftBg from '../../assets/images/banner/radial-left.webp';
import radialRightBg from '../../assets/images/banner/radial-right.webp';
import neonDotsBg from '../../assets/images/banner/neon-dots.webp';

export const DiscountBanner = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <section id="discount" className="relative overflow-visible max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto px-6 sm:px-8 md:px-10 lg:px-4 py-10 md:py-14 lg:py-16">
      {/* Decorative Neon Dots Pattern OUTSIDE the card in bottom-right position */}
      <img
        src={neonDotsBg}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute -right-3 -bottom-4 sm:-right-4 sm:-bottom-4 md:-right-6 md:-bottom-2 lg:-right-16 lg:bottom-0 pointer-events-none z-20 w-28 sm:w-36 md:w-40 lg:w-44 object-contain opacity-90 select-none"
      />

      {/* Main Banner Card */}
      <div className="relative z-10 rounded-2xl md:rounded-[28px] bg-[#131518] border border-[#22262c] overflow-hidden shadow-2xl">
        {/* Radial Lines Left */}
        <img
          src={radialLeftBg}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute -left-10 -bottom-10 w-48 sm:w-64 md:w-72 lg:w-80 pointer-events-none opacity-40 select-none"
        />

        {/* Radial Lines Right */}
        <img
          src={radialRightBg}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute -right-8 -top-8 w-48 sm:w-64 md:w-72 lg:w-80 pointer-events-none opacity-40 select-none"
        />

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center text-center py-8 sm:py-10 md:py-12 lg:py-16 px-5 sm:px-8 md:px-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2.5 md:mb-3 tracking-tight">
            {t('discount.title', 'Get a discount of up to 60%')}
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 max-w-md md:max-w-lg mb-6 md:mb-8 leading-relaxed">
            {t(
              'discount.subtitle',
              "Get the latest articles and business updates that you need to know, you'll even get special recommendations weekly."
            )}
          </p>

          {isSubscribed ? (
            <div className="flex items-center gap-2.5 px-6 py-3.5 bg-brand-cyan/15 border border-brand-cyan text-brand-cyan rounded-xl text-xs sm:text-sm font-semibold animate-in fade-in duration-300">
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t('discount.success', 'You have successfully subscribed to exclusive offers!')}</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="max-w-md md:max-w-lg w-full flex flex-col sm:flex-row gap-2.5 sm:gap-3"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('discount.placeholder', 'Your email')}
                  className="w-full bg-[#181a1d] text-white placeholder-gray-500 rounded-xl pl-11 pr-4 py-3 sm:py-3.5 outline-none border border-[#2b2f36] hover:border-gray-600 focus:border-brand-cyan transition-colors duration-200 text-xs sm:text-sm"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl text-black shadow-lg hover:shadow-[0_0_20px_var(--color-brand-cyan-glow)] active:scale-95"
              >
                {t('discount.button', 'RECEIVE')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
