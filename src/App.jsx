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
  return (
    <div className="min-h-screen bg-[#0d0f11] text-white selection:bg-brand-cyan selection:text-black">
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
  );
}

export default App;
