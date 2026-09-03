import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import radialBg from '../../assets/images/radial.png';
import neonDotsBg from '../../assets/images/neon-dots.png';

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
    <section id="discount" className="w-full py-12 md:py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto relative rounded-3xl bg-[#141619] border border-[#23272d] p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
        {/* Radial Glow Background in Center */}
        <img
          src={radialBg}
          alt=""
          className="absolute inset-0 m-auto w-full h-full object-cover sm:object-contain opacity-75 pointer-events-none mix-blend-screen"
        />

        {/* Neon Dots Pattern on Right Side */}
        <img
          src={neonDotsBg}
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-auto max-w-[50%] object-contain opacity-70 pointer-events-none"
        />

        {/* Foreground Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t('discount.title', 'Get a discount of up to 60%')}
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-8 max-w-lg leading-relaxed">
            {t(
              'discount.subtitle',
              'Subscribe to our news and be the first to know about discounts and special offers'
            )}
          </p>

          {isSubscribed ? (
            <div className="flex items-center gap-2.5 px-6 py-3.5 bg-brand-cyan/15 border border-brand-cyan text-brand-cyan rounded-xl text-sm font-semibold animate-in fade-in duration-300">
              <Check className="w-5 h-5" />
              <span>{t('discount.success', 'You have successfully subscribed to exclusive offers!')}</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('discount.placeholder', 'Your email')}
                className="w-full sm:flex-1 bg-[#181a1d] text-white placeholder-gray-500 rounded-md px-4 py-3.5 outline-none border border-[#2b2f36] hover:border-gray-600 focus:border-brand-cyan transition-colors duration-200 text-sm"
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto px-8 py-3.5 font-bold tracking-wider"
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
