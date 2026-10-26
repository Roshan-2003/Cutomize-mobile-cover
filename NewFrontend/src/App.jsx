import React from "react";
import AnnouncementBar from "./component/AnnouncementBar";
import Navbar from "./component/Navbar";
import HeroCarousel from "./component/HeroCarousel";
import WatchNShop from "./component/WatchNShop";
import Bestsellers from "./component/Bestsellers";
import ProductShowcasePage from "./component/ProductShowcase";

export default function App() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-[#f45d19] selection:text-white">
      <AnnouncementBar />
      <Navbar />
      <HeroCarousel />
      <WatchNShop />
      <Bestsellers />
      <ProductShowcasePage />
    </main>
  );
}
