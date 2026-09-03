import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MessageCircle, ChevronDown, FastForward } from 'lucide-react';
import { CanvasSequence } from './CanvasSequence';

export const Hero = () => {
  const { t } = useTranslation();
  const heroSectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { city: 'Dubai', subtitle: 'LUXURY CAR RENTAL' },
    { city: 'Dubai', subtitle: 'EXCLUSIVE SUPERCARS' },
  ];

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
  // 1. Initial Hint ("Scroll down to reveal"): visible from 0 to 0.18
  const hintOpacity = Math.max(0, 1 - scrollProgress / 0.18);

  // 2. Final Branding UI ("Dubai", subtitle, controls): smoothly appears from 0.50 to 0.90
  const revealProgress = Math.min(1, Math.max(0, (scrollProgress - 0.5) / 0.4));

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative w-full h-[170vh] -mt-20 bg-[#0d0f11]"
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

        {/* 1. INITIAL PHASE UI: Floating "Scroll down to reveal" cue */}
        <div
          className="absolute inset-x-0 bottom-12 z-20 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
          style={{
            opacity: hintOpacity,
            transform: `translateY(${(1 - hintOpacity) * -15}px)`,
          }}
        >
          <div className="flex flex-col items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-gray-300 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_var(--color-brand-cyan)]" />
              Scroll to reveal
            </span>
            <ChevronDown className="w-4 h-4 text-brand-cyan animate-bounce" />
          </div>
        </div>

        {/* 2. SKIP INTRO BUTTON (Glassmorphism, hover #29b6b6) */}
        <div
          className="absolute bottom-8 right-6 md:right-12 z-30 transition-all duration-300 pointer-events-auto"
          style={{
            opacity: Math.max(0, 1 - (scrollProgress - 0.5) / 0.3),
            pointerEvents: scrollProgress > 0.8 ? 'none' : 'auto',
          }}
        >
          <button
            onClick={handleSkipIntro}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-[#29b6b6] text-xs font-semibold uppercase tracking-widest text-gray-200 hover:text-[#29b6b6] transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(41,182,182,0.35)] group cursor-pointer"
            aria-label="Skip intro animation"
          >
            <span>Skip Intro</span>
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
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] font-sans">
            {t('hero.city', slides[activeSlide].city)}
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.3em] md:tracking-[0.45em] text-gray-200 mt-2 md:mt-3 uppercase drop-shadow-lg">
            {t('hero.subtitle', slides[activeSlide].subtitle)}
          </p>
        </div>

        {/* Bottom Controls (Slider Indicators & Floating Messengers) */}
        <div
          className={`relative z-20 w-full flex items-end justify-between max-w-7xl mx-auto px-6 md:px-12 pb-8 sm:pb-12 transition-all duration-500 ${
            revealProgress > 0.5 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{
            opacity: revealProgress,
            transform: `translateY(${(1 - revealProgress) * 20}px)`,
          }}
        >
          {/* Left spacer to keep slider dots centered on tablet/desktop */}
          <div className="w-14 sm:w-28 hidden sm:block pointer-events-none" />

          {/* Center: Slider Dots Indicators */}
          <div className="flex flex-col items-center gap-4 mx-auto sm:mx-0">
            <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlide === idx
                      ? 'w-6 h-2 bg-brand-cyan shadow-[0_0_10px_var(--color-brand-cyan)]'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Minimalist vertical line indicator */}
            <div className="w-[1px] h-6 bg-gradient-to-b from-brand-cyan/80 to-transparent" />
          </div>

          {/* Right: Floating Messengers (Telegram & WhatsApp) */}
          <div className="flex sm:flex-col items-center gap-3">
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
              href="https://wa.me/971585907875"
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
