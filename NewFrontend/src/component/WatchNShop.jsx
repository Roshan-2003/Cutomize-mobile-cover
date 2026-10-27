import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Gingham Love Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video1.mp4",
  },
  {
    id: 2,
    name: "Sunny Skies Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video2.mp4",
  },
  {
    id: 3,
    name: "Blue Flower Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video3.mp4",
  },
  {
    id: 4,
    name: "Diet Coke Pop Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video4.mp4",
  },
  {
    id: 5,
    name: "Love Meow Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video5.mp4",
  },
  {
    id: 6,
    name: "Orange Fruit Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video6.mp4",
  
  },
  {
    id: 7,
    name: "Floral Dream Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video8.mp4",
  },
  {
    id: 8,
    name: "Classic Pattern Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video10.mp4",

  },
];

function ProductVideoCard({ product, activeVideoId, onVideoPlay }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (activeVideoId !== null && activeVideoId !== product.id) {
      videoRef.current?.pause();
    }
  }, [activeVideoId, product.id]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);

      if (!nextMuted) {
        onVideoPlay(product.id);
        video.play().catch((error) => {
          console.error("Unable to play product video:", error);
        });
      }
    }
  };

  return (
    <article className="group relative shrink-0 snap-start overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-slate-700 w-[160px] h-[285px] xs:w-[185px] xs:h-[330px] sm:w-[210px] sm:h-[375px] md:w-[240px] md:h-[425px] lg:w-[270px] lg:h-[480px]">
      {/* Product video - scales responsively with card */}
      <video
        ref={videoRef}
        src={product.video}
        poster={product.image}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => onVideoPlay(product.id)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Top badges: Sunset Gradient Discount badge & Mute toggle */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-2 xs:p-2.5 sm:p-3">
        <span className="rounded-lg bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] text-white px-2.5 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md">
          {product.discount}
        </span>

        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 backdrop-blur-sm transition hover:bg-[#ff4d2d] active:scale-95"
        >
          {isMuted ? (
            <VolumeX className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          ) : (
                        <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

          )}
        </button>
      </div>

      {/* Bottom product details with thumbnail */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-2.5 xs:p-3 sm:p-3.5 text-white">
        <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 rounded-xl border border-white/40 bg-white object-contain p-0.5 shadow-sm"
          />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xs sm:text-sm font-bold text-white">
              {product.name}
            </h3>

            <div className="mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] via-[#ff4365] to-orange-400">
                Rs. {product.price.toLocaleString("en-IN")}.00
              </span>

              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                Rs. {product.originalPrice.toLocaleString("en-IN")}.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WatchNShop() {
  const scrollRef = useRef(null);
  const [activeVideoId, setActiveVideoId] = useState(null);

  const scrollProducts = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("article")?.offsetWidth || 220;
    scrollRef.current.scrollBy({
      left: direction * (cardWidth + 16) * 1.5,
      behavior: "smooth",
    });
  };

  return (
    <section id="watch-shop" className="w-full overflow-hidden bg-gradient-to-b from-white via-orange-50/15 to-white text-slate-900 px-3 xs:px-4 sm:px-6 md:px-7 py-10 sm:py-16 border-b border-slate-100">
      <div className="mx-auto max-w-8xl">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="font-['Bagel_Fat_One'] text-2xl xs:text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            WATCH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e]">N</span> SHOP
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Tap to watch in action and grab exclusive deals
          </p>
        </div>

        <div className="relative group/slider">
          {/* Previous scroll button */}
          {/* <button
            onClick={() => scrollProducts(-1)}
            aria-label="Scroll left"
            className="absolute -left-2 sm:-left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white text-slate-900 border border-slate-200 shadow-xl hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white hover:border-transparent transition-all duration-300 active:scale-95"
          >
            <ChevronLeft size={22} />
          </button> */}

          {/* Product videos slider */}
          <div
            ref={scrollRef}
            className="flex gap-3 xs:gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <ProductVideoCard
                key={product.id}
                product={product}
                activeVideoId={activeVideoId}
                onVideoPlay={setActiveVideoId}
              />
            ))}
          </div>

          {/* Next scroll button */}
          {/* <button
            onClick={() => scrollProducts(1)}
            aria-label="Scroll right"
            className="absolute -right-2 sm:-right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white text-slate-900 border border-slate-200 shadow-xl hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white hover:border-transparent transition-all duration-300 active:scale-95"
          >
            <ChevronRight size={22} />
          </button> */}
        </div>
      </div>
    </section>
  );
}
