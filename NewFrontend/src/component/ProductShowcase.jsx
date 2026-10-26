import React from "react";

const products = [
  {
    id: 1,
    name: "ORANGE FRUIT CASE",
    price: 999,
    oldPrice: 1199,
    image: "/images/Orangefruitcase1.webp",
    lifestyle: "/images/Orange_fruit_case1_5.webp",
    hoverImage: "/images/Orange_fruit_case_4.webp",
  },
];

function ProductShowcase({ product }) {
  return (
    <section
      id="collection"
      className="grid grid-cols-1 overflow-hidden lg:grid-cols-2 min-h-[460px] lg:min-h-[520px]"
    >
      {/* Left: Lifestyle image */}
      <div className="relative h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] lg:h-auto overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <img
          src={product.lifestyle}
          alt="Phone case styled with fresh oranges and warm fabric"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-extrabold text-slate-900 shadow-xl backdrop-blur-sm border border-slate-200/60">
          <span className="h-2 w-2 rounded-full bg-[#ff4d2d] animate-pulse" />
          <span>Style your everyday</span>
        </div>
      </div>

      {/* Right: Product details */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#0c101d] via-[#111728] to-[#1c1936] px-4 py-8 xs:px-6 sm:px-10 sm:py-12 lg:py-10 text-white shadow-2xl">
        <div className="mb-3 sm:mb-4 flex w-full max-w-[420px] items-start justify-between gap-3">
          <div>
            <span className="mb-1.5 sm:mb-2 inline-block rounded-md bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white shadow-xs">
              BESTSELLER
            </span>
            <h3 className="font-['Bagel_Fat_One'] text-sm sm:text-base font-extrabold uppercase tracking-wide text-white">
              {product.name}
            </h3>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-amber-200">
              Rs. {product.price.toLocaleString("en-IN")}.00
            </p>
            <p className="text-xs sm:text-sm text-slate-400 line-through">
              Rs. {product.oldPrice.toLocaleString("en-IN")}.00
            </p>
          </div>
        </div>

        {/* Hover image card */}
        <div className="group relative h-[240px] xs:h-[280px] sm:h-[360px] md:h-[400px] lg:h-[420px] w-full max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-2xl border border-white/20">
          {/* Original Image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />

          {/* Hover Image */}
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        <div className="mt-4 sm:mt-5 flex w-full max-w-[420px] items-center justify-between gap-3">
          <p className="text-xs sm:text-sm font-medium text-slate-300">
            Premium design. Everyday protection.
          </p>

          <button className="shrink-0 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] hover:from-[#ff3a17] hover:to-[#e11d48] px-5 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-all shadow-lg shadow-orange-500/30 active:scale-95">
            Shop Now →
          </button>
        </div>
      </div>
    </section>
  );
}

function OfferBanner() {
  return (
    <section
      aria-label="Special offers"
      className="overflow-hidden bg-gradient-to-r from-[#ff4d2d] via-[#f43f5e] to-[#ff5722] py-4 sm:py-5 md:py-6 text-white select-none shadow-md"
    >
      <div className="offer-marquee w-full font-['Bagel_Fat_One'] overflow-hidden">
        <div className="offer-track flex w-max items-center gap-6 sm:gap-10 md:gap-14 whitespace-nowrap">
          {[1, 2, 3, 4].map((item) => (
            <p
              key={item}
              className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-sm"
            >
              BUY 1 @999 · BUY 2 @1599 · BUY 3 @1999
              <span className="mx-3 sm:mx-5 text-amber-200">
                ✦ FREE GIFTS INSIDE
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductShowcasePage() {
  return (
    <div className="w-full bg-[#0c101d]">
      <ProductShowcase product={products[0]} />
      <OfferBanner />
    </div>
  );
}
