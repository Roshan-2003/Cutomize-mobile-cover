
import { useState } from "react";
import AnnouncementBar from "./component/AnnouncementBar";
import Navbar from "./component/Navbar";
import HeroCarousel from "./component/HeroCarousel";
import WatchNShop from "./component/WatchNShop";
import Bestsellers from "./component/Bestsellers";
import ProductShowcasePage from "./component/ProductShowcase";







// Main App Component
export default function App() {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <HeroCarousel />
      <WatchNShop/>
      <Bestsellers/>
      <ProductShowcasePage/>
    </main>
  );
}
