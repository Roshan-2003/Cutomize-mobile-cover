
import { useState } from "react";
import AnnouncementBar from "./component/AnnouncementBar";
import Navbar from "./component/Navbar";
import HeroCarousel from "./component/HeroCarousel";







// Main App Component
export default function App() {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <HeroCarousel />
    </main>
  );
}
