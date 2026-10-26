
import React from "react";
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
} from "lucide-react";

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
      id="home"
      className="grid min-h-[500px] grid-cols-1 overflow-hidden lg:h-[min(650px,72vw)] lg:min-h-[520px] lg:grid-cols-2"
    >
      {/* Left: Lifestyle image */}
      <div className="relative h-[370px] overflow-hidden bg-[#f5e4d1] sm:h-[520px] lg:h-full">
        <img
          src={product.lifestyle}
          alt="Phone case styled with fresh oranges and warm fabric"
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-6 left-6 rounded-full bg-white/85 px-5 py-3 text-sm font-bold text-neutral-900 shadow-sm backdrop-blur-sm">
          Style your everyday
        </div>
      </div>

      {/* Right: Product details */}
      <div className="flex flex-col items-center justify-center bg-[#747bc9] px-5 py-8 text-white sm:px-10 lg:py-5">
        <div className="mb-3 flex w-full max-w-[440px] items-start justify-between gap-3">
          <div>
            <span className="mb-2 inline-block rounded-sm bg-[#ff641f] px-2 py-1 text-[10px] font-extrabold tracking-wider">
              BESTSELLER
            </span>
            <h1 className="text-sm font-extrabold uppercase sm:text-base">
              {product.name}
            </h1>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-lg font-bold sm:text-xl">
              Rs. {product.price.toLocaleString("en-IN")}.00
            </p>
            <p className="text-sm text-white/70 line-through sm:text-base">
              Rs. {product.oldPrice.toLocaleString("en-IN")}.00
            </p>
          </div>
        </div>

        <div className="flex h-[350px] w-full max-w-[400px] items-center justify-center overflow-hidden bg-white sm:h-[430px] lg:h-[min(470px,48vw)]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-2 transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="mt-5 flex w-full max-w-[400px] items-center justify-between gap-3">
          <p className="text-xs font-medium text-white/90">
            Premium design. Everyday protection.
          </p>

          <button className="shrink-0 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-[#4d50a3] transition hover:bg-[#ff641f] hover:text-white">
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
      className="overflow-hidden bg-[#ff641f] py-4 text-white sm:py-5"
    >
    <div className="offer-marquee w-full font-['Bagel_Fat_One'] overflow-hidden">
  <div className="offer-track flex w-max items-center gap-12 whitespace-nowrap">
    {[1, 2, 3, 4].map((item) => (
      <p
        key={item}
        className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl lg:text-7xl"
      >
        BUY 1 @999 · BUY 2 @1599 · BUY 3 @1999
        <span className="mx-5 text-[#ffe0a5]">
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
    <main className="min-h-screen bg-white">

      <ProductShowcase product={products[0]} />

      <OfferBanner />
    </main>
  );
}
