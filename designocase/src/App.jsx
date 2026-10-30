import { useState } from "react";

import AnnouncementBar from "./component/AnnouncementBar";
import Navbar from "./component/Navbar";
import SearchPanel from "./component/SearchPanel";
import NavigationDrawer from "./component/NavigationDrawer";
import CartDrawer from "./component/CartDrawer";
import HeroCarousel from "./component/HeroCarousel";

import slides from "./data/slides";
import BestSellers from "./component/BestSellers";
import ShopyByDesign from "./component/ShopByDesign";
import TrustBar from "./component/Trustbar";
import NewsletterGallery from "./component/NewsGallery";
import Footer from "./component/Footer";

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <AnnouncementBar />

      <div className="relative mx-auto max-w-full rounded-t-[28px] bg-white/50 px-4 pb-6 sm:px-6 lg:px-[3.1%]">
        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />

        <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        <NavigationDrawer
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />

        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        <HeroCarousel
          slides={slides}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
      </div>

      <BestSellers />
      <ShopyByDesign/>
      <TrustBar/>
      <NewsletterGallery/>
      <Footer/>
      {/* <ShopByDesigns /> */}
    </main>
  );
}
