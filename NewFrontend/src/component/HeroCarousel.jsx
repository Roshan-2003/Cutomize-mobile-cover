import React from "react";
import { useState } from "react";
import festiveBanner from "../assets/festive_desktop_banner.webp";
import festiveBannerSecond from "../assets/festive_desktop_banner_second.webp";
import newdesign from "../assets/newdesign.png"

import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: festiveBanner,
      imageAlt: "CovrX festive sale and phone covers",
    },
    {
      image: festiveBannerSecond,
      imageAlt: "CovrX phone cover collection",
    },
    {
      image: newdesign,
      imageAlt: "CovrX new design collection",
    }
  ];

  const slide = slides[activeSlide];

  const changeSlide = (direction) => {
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  return (
    <section id="home" className="relative h-[630px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src={slide.image}
        alt={slide.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Hero content */}

      {/* Previous button */}
      <button
        onClick={() => changeSlide(-1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:bg-[#f45d19] hover:text-white sm:left-6 sm:h-12 sm:w-12"
      >
        <ChevronLeft size={25} />
      </button>

      {/* Next button */}
      <button
        onClick={() => changeSlide(1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:bg-[#f45d19] hover:text-white sm:right-6 sm:h-12 sm:w-12"
      >
        <ChevronRight size={25} />
      </button>

      {/* Carousel dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition ${
              activeSlide === index ? "scale-110 bg-[#f45d19]" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
