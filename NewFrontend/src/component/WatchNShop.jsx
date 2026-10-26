import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Gingham Love Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video1.mp4",
    image: "/images/6.webp",
  },
  {
    id: 2,
    name: "Sunny Skies Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video2.mp4",
    image: "/images/3.webp",
  },
  {
    id: 3,
    name: "Blue Flower Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video3.mp4",
    image: "/images/5.webp",
  },
  {
    id: 4,
    name: "Diet Coke Pop Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video4.mp4",
    image: "/images/newimage.webp",
  },
  {
    id: 5,
    name: "Love Meow Case",
    price: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    video: "/videos/video5.mp4",
    image: "/images/7.webp",
  },
  {
    id: 6,
    name: "Orange Fruit Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video6.mp4",
    image: "/images/Orangefruitcase1.webp",
  },
  {
    id: 7,
    name: "Floral Dream Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video8.mp4",
    image: "/images/Orange_fruit_case1_5.webp",
  },
  {
    id: 8,
    name: "Classic Pattern Case",
    price: 1249,
    originalPrice: 1499,
    discount: "17% OFF",
    video: "/videos/video10.mp4",
    image: "/images/Orange_fruit_case_4.webp",
  },
];

function ProductVideoCard({ product }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <article className="group relative shrink-0 snap-start overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 shadow-md transition-all duration-300 hover:shadow-xl w-[160px] h-[285px] xs:w-[185px] xs:h-[330px] sm:w-[210px] sm:h-[375px] md:w-[240px] md:h-[425px] lg:w-[270px] lg:h-[480px]">
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
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Top badges: Discount & Mute toggle */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-2 xs:p-2.5 sm:p-3">
        <span className="rounded-md bg-red-600/90 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-bold text-white shadow-sm">
          {product.discount}
        </span>

        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/80 active:scale-95"
        >
          {isMuted ? (
            <VolumeX className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          ) : (
            <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          )}
        </button>
      </div>

      {/* Bottom product details with thumbnail */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2.5 xs:p-3 sm:p-3.5 text-white">
        <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 rounded-lg border border-white/30 bg-white object-contain p-0.5"
          />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xs sm:text-sm font-bold text-white">
              {product.name}
            </h3>

            <div className="mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-[#ff641f]">
                Rs. {product.price.toLocaleString("en-IN")}.00
              </span>

              <span className="text-[10px] sm:text-xs text-white/60 line-through">
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

  const scrollProducts = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("article")?.offsetWidth || 220;
    scrollRef.current.scrollBy({
      left: direction * (cardWidth + 16) * 1.5,
      behavior: "smooth",
    });
  };

  return (
    <section id="watch-shop" className="w-full overflow-hidden bg-white  xs:px-4 sm:px-6 md:px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-8xl">
        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="font-['Bagel_Fat_One'] text-2xl xs:text-3xl sm:text-4xl text-[#333]">
            WATCH N SHOP
          </h2>
          {/* <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Tap to watch in action and grab exclusive deals
          </p> */}
        </div>

        <div className="relative group/slider">
          {/* Previous scroll button */}
          {/* <button
            onClick={() => scrollProducts(-1)}
            aria-label="Scroll left"
            className="absolute -left-2 sm:-left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-[#f45d19] hover:text-white transition active:scale-95"
          >
            <ChevronLeft size={22} />
          </button> */}

          {/* Product videos slider */}
          <div
            ref={scrollRef}
            className="flex gap-3 xs:gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <ProductVideoCard key={product.id} product={product} />
            ))}
          </div>

          {/* Next scroll button */}
          {/* <button
            onClick={() => scrollProducts(1)}
            aria-label="Scroll right"
            className="absolute -right-2 sm:-right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-[#f45d19] hover:text-white transition active:scale-95"
          >
            <ChevronRight size={22} />
          </button> */}
        </div>
      </div>
    </section>
  );
}
