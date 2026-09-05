import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MessageCircle, ChevronDown, FastForward } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { CanvasSequence } from './CanvasSequence';

export const Hero = () => {
  const { t } = useTranslation();
  const { selectedCity, location } = useLocation();
  const heroSectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll tracking to calculate Hero section progress (0.0 to 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const section = heroSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / scrollableDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skipAnimRef = useRef(null);

  // Handle Skip Intro button click with smooth cinematic deceleration at the end
  const handleSkipIntro = () => {
    if (skipAnimRef.current) {
      cancelAnimationFrame(skipAnimRef.current);
    }

    const section = heroSectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const startY = window.scrollY;
    const targetY = startY + rect.bottom - window.innerHeight;
    const distance = targetY - startY;
    if (distance <= 0) return;

    // 1.3s total duration with easeOutQuart for a fast start and luxurious, slowed-down finish
    const duration = 1300;
    const startTime = performance.now();
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        skipAnimRef.current = requestAnimationFrame(step);
      } else {
        skipAnimRef.current = null;
      }
    };

    skipAnimRef.current = requestAnimationFrame(step);
  };

  // Cancel skip animation if user takes over manual scrolling
  useEffect(() => {
    const handleUserInterrupt = () => {
      if (skipAnimRef.current) {
        cancelAnimationFrame(skipAnimRef.current);
        skipAnimRef.current = null;
      }
    };

    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchmove', handleUserInterrupt, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchmove', handleUserInterrupt);
      if (skipAnimRef.current) {
        cancelAnimationFrame(skipAnimRef.current);
      }
    };
  }, []);

  // Calculate UI opacities based on scrollytelling progress
  // 1. Initial Hint (Arrow): visible from 0 to 0.12
  const hintOpacity = Math.max(0, 1 - scrollProgress / 0.12);

  // 2. Final Branding UI ("Dubai", subtitle, controls): smoothly appears from 0.45 to 0.85
  const revealProgress = Math.min(1, Math.max(0, (scrollProgress - 0.45) / 0.4));

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative w-full h-[250vh] bg-[#0d0f11]"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Interactive Canvas Frame Sequence */}
        <CanvasSequence progress={scrollProgress} />

        {/* Ambient Dark Gradients for flawless visual hierarchy */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f11]/85 via-transparent to-[#0d0f11]/90 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-[#0d0f11]/30 to-[#0d0f11]/70 pointer-events-none z-10" />

        {/* Top spacer (reserves space for fixed header) */}
        <div className="w-full h-24 sm:h-28 z-20 pointer-events-none" />

        {/* 1. INITIAL PHASE UI: Floating scroll indicator (Arrow only) */}
        <div
          className="absolute inset-x-0 bottom-8 sm:bottom-10 z-20 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
          style={{
            opacity: hintOpacity,
            transform: `translateY(${(1 - hintOpacity) * -15}px)`,
          }}
        >
          <div className="flex items-center justify-center w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-brand-cyan animate-bounce" />
          </div>
        </div>

        {/* 2. SKIP INTRO BUTTON (Glassmorphism, hover #29b6b6, equalized height on tablet/desktop) */}
        <div
          className="absolute bottom-8 sm:bottom-10 right-4 sm:right-8 md:right-12 z-30 transition-all duration-300 pointer-events-auto flex items-center"
          style={{
            opacity: Math.max(0, 1 - (scrollProgress - 0.5) / 0.3),
            pointerEvents: scrollProgress > 0.8 ? 'none' : 'auto',
          }}
        >
          <button
            onClick={handleSkipIntro}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 h-10 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-[#29b6b6] text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-gray-200 hover:text-[#29b6b6] transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(41,182,182,0.35)] group cursor-pointer"
            aria-label="Skip intro animation"
          >
            <span>{t('hero.skipIntro', 'Skip Intro')}</span>
            <FastForward className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#29b6b6] group-hover:translate-x-0.5 transition-all duration-300" />
          </button>
        </div>

        {/* 3. FINAL PHASE UI: Revealed Luxury Hero Content */}
        <div
          className="relative z-20 text-center flex flex-col items-center justify-center my-auto px-6 transition-all duration-500 pointer-events-none"
          style={{
            opacity: revealProgress,
            transform: `translateY(${(1 - revealProgress) * 30}px)`,
          }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] font-sans uppercase">
            {selectedCity}
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.3em] md:tracking-[0.45em] text-gray-200 mt-2 md:mt-3 uppercase drop-shadow-lg">
            {t('hero.subtitle', 'LUXURY CAR RENTAL')}
          </p>
        </div>

        {/* Bottom Controls (Floating Messengers) */}
        <div
          className={`relative z-20 w-full flex items-end justify-end max-w-7xl mx-auto px-6 md:px-12 pb-8 sm:pb-12 transition-all duration-500 ${
            revealProgress > 0.5 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{
            opacity: revealProgress,
            transform: `translateY(${(1 - revealProgress) * 20}px)`,
          }}
        >
          {/* Right: Floating Messengers (Telegram & WhatsApp) */}
          <div className="flex sm:flex-col items-center gap-3 ml-auto">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[#24a1de] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg shadow-[#24a1de]/40 cursor-pointer"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5 -translate-x-0.5 translate-y-0.5" />
            </a>

            <a
              href={`https://wa.me/${location.phoneRaw ? location.phoneRaw.replace('+', '') : '971585907875'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[#25d366] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg shadow-[#25d366]/40 cursor-pointer"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
