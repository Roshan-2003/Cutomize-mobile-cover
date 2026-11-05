import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import ProductDetail from "./productDetail";
import ProfilePage from "./pages/ProfilePage";

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const shouldBlurContent = menuOpen || searchOpen || cartOpen;

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <AnnouncementBar />

      <div
        className={
          shouldBlurContent ? "blur-[1.6px] brightness-90 transition-all duration-200" : "transition-all duration-200"
        }
      >
        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />

        <HeroCarousel
          slides={slides}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />

        <BestSellers />
        <ShopyByDesign />
        <TrustBar />
        <NewsletterGallery />
        <Footer />
      </div>

      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NavigationDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
