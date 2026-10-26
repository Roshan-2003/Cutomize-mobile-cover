import React from "react";

const products = [
  {
    id: 1,
    name: "ORANGE FRUIT CASE",
    price: 999,
    oldPrice: 1199,
    image: "/images/Orangefruitcase1.webp",
    lifestyle: "/images/Orange_fruit_case1_5.webp",
  },
];

function ProductShowcase({ product }) {
  return (
    <section
      id="collection"
      className="grid grid-cols-1 overflow-hidden lg:grid-cols-2 min-h-[460px] lg:min-h-[520px]"
    >
      {/* Left: Lifestyle image */}
      <div className="relative h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] lg:h-auto overflow-hidden bg-[#f5e4d1]">
        <img
          src={product.lifestyle}
          alt="Phone case styled with fresh oranges and warm fabric"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-full bg-white/90 px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-neutral-900 shadow-md backdrop-blur-sm">
          Style your everyday
        </div>
      </div>

      {/* Right: Product details */}
      <div className="flex flex-col items-center justify-center bg-[#747bc9] px-4 py-8 xs:px-6 sm:px-10 sm:py-12 lg:py-10 text-white">
        <div className="mb-3 sm:mb-4 flex w-full max-w-[420px] items-start justify-between gap-3">
          <div>
            <span className="mb-1.5 sm:mb-2 inline-block rounded-sm bg-[#ff641f] px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white">
              BESTSELLER
            </span>
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide">
              {product.name}
            </h3>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-base sm:text-xl font-bold">
              Rs. {product.price.toLocaleString("en-IN")}.00
            </p>
            <p className="text-xs sm:text-sm text-white/70 line-through">
              Rs. {product.oldPrice.toLocaleString("en-IN")}.00
            </p>
          </div>
        </div>

        {/* Product showcase image card - full image display without crop */}
        <div className="flex h-[240px] xs:h-[280px] sm:h-[360px] md:h-[400px] lg:h-[420px] w-full max-w-[420px] items-center justify-center overflow-hidden rounded-2xl bg-white p-3 sm:p-5 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-2 sm:p-3 transition-transform duration-500 hover:scale-105 drop-shadow-sm"
          />
        </div>

        <div className="mt-4 sm:mt-5 flex w-full max-w-[420px] items-center justify-between gap-3">
          <p className="text-xs sm:text-sm font-medium text-white/90">
            Premium design. Everyday protection.
          </p>

          <button className="shrink-0 rounded-full bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-extrabold text-[#4d50a3] transition hover:bg-[#ff641f] hover:text-white active:scale-95 shadow-sm">
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
      className="overflow-hidden bg-[#ff641f] py-3 sm:py-4 md:py-5 text-white select-none"
    >
      <div className="offer-marquee w-full font-['Bagel_Fat_One'] overflow-hidden">
        <div className="offer-track flex w-max items-center gap-6 sm:gap-10 md:gap-14 whitespace-nowrap">
          {[1, 2, 3, 4].map((item) => (
            <p
              key={item}
              className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight"
            >
              BUY 1 @999 · BUY 2 @1599 · BUY 3 @1999
              <span className="mx-3 sm:mx-5 text-[#ffe0a5]">
                + FREE GIFTS INSIDE
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
    <div className="w-full bg-white">
      <ProductShowcase product={products[0]} />
      <OfferBanner />
    </div>
  );
}
