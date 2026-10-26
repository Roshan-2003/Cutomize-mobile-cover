import React, { useState, useEffect, useRef } from "react";
import festiveBanner from "../assets/festive_desktop_banner.webp";
import festiveBannerSecond from "../assets/festive_desktop_banner_second.webp";
import newdesign from "../assets/newdesign.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

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
    },
  ];

  const changeSlide = (direction) => {
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length
    );
  };

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Touch swipe support for mobile and tablet
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      changeSlide(1);
    } else if (diff < -40) {
      changeSlide(-1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="home"
      aria-label="Promotional banner carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden bg-[#0b0f19] aspect-[2.3/1] xs:aspect-[2.45/1] sm:aspect-[2.6/1] md:aspect-[2.76/1] max-h-[620px] select-none"
    >
      {/* Slides */}
      {slides.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
            activeSlide === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={item.image}
            alt={item.imageAlt}
            loading={index === 0 ? "eager" : "lazy"}
            className="h-full w-full object-cover sm:object-cover object-center"
          />
        </div>
      ))}

      {/* Previous button */}
      <button
        onClick={() => changeSlide(-1)}
        aria-label="Previous slide"
        className="absolute left-2 xs:left-3 sm:left-5 md:left-7 top-1/2 z-20 flex h-7 w-7 xs:h-8 xs:w-8 sm:h-11 sm:w-11 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-xl backdrop-blur-xs transition-all duration-300 hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white border border-white/40 active:scale-95"
      >
        <ChevronLeft className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-6 sm:w-6" />
      </button>

      {/* Next button */}
      <button
        onClick={() => changeSlide(1)}
        aria-label="Next slide"
        className="absolute right-2 xs:right-3 sm:right-5 md:right-7 top-1/2 z-20 flex h-7 w-7 xs:h-8 xs:w-8 sm:h-11 sm:w-11 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-xl backdrop-blur-xs transition-all duration-300 hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white border border-white/40 active:scale-95"
      >
        <ChevronRight className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-6 sm:w-6" />
      </button>

      {/* Carousel dots */}
      <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 sm:h-2 md:h-2.5 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? "w-5 sm:w-7 md:w-9 bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] shadow-md shadow-orange-500/50"
                : "w-1.5 sm:w-2 md:w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
