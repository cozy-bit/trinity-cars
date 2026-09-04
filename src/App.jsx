import { useEffect } from "react";
import { LocationProvider } from "./context/LocationContext";

// Layout
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

// Sections
import { Hero } from "./components/sections/Hero";
import { MostPopular } from "./components/sections/MostPopular";
import { SpecialOffers } from "./components/sections/SpecialOffers";
import { AboutUs } from "./components/sections/AboutUs";
import { Reviews } from "./components/sections/Reviews";
import { Advantages } from "./components/sections/Advantages";
import { MapContact } from "./components/sections/MapContact";
import { DiscountBanner } from "./components/sections/DiscountBanner";

function App() {
  // Prevent browser auto-scrolling on page reload / refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <LocationProvider>
      <div className="min-h-screen bg-[#0d0f11] text-white selection:bg-brand-cyan selection:text-black overflow-x-hidden">
        <Header />

        <main className="pt-20">
          <Hero />
          <MostPopular />

          {/* Блоки Бахтовара */}
          <SpecialOffers />
          <AboutUs />

          <Reviews />
          <Advantages />
          <MapContact />
          <DiscountBanner />
        </main>

        <Footer />
      </div>
    </LocationProvider>
  );
}

export default App;
