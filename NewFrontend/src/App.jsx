import React from "react";
import AnnouncementBar from "./component/AnnouncementBar";
import Navbar from "./component/Navbar";
import HeroCarousel from "./component/HeroCarousel";
import WatchNShop from "./component/WatchNShop";
import Bestsellers from "./component/Bestsellers";
import ProductShowcasePage from "./component/ProductShowcase";
import NewArrivals from "./component/NewArrivals";
import CustomerReviews from "./component/CustomerReviews";
import Footer from "./component/Footer";

export default function App() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-white text-slate-900 selection:bg-[#ff4d2d] selection:text-white">
      <AnnouncementBar />
      <Navbar />
      <HeroCarousel />
      <WatchNShop />
      <Bestsellers />
      <ProductShowcasePage />
      <NewArrivals />
      <CustomerReviews />
      <Footer />
    </main>
  );
}
