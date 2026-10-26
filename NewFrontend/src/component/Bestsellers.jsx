import React from "react";

const products = [
  {
    id: 1,
    name: "SUNNY SKIES CASE",
    image: "/images/3.webp",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 2,
    name: "BLUE FLOWER CASE",
    image: "/images/5.webp",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 3,
    name: "GINGHAM LOVE CASE",
    image: "/images/6.webp",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 4,
    name: "LOVE MEOW CASE",
    image: "/images/7.webp",
    price: 999,
    oldPrice: 1499,
  },
];

const featuredProduct = {
  name: "DIET COKE POP CASE",
  image: "/images/newimage.webp",
  price: 999,
  oldPrice: 1499,
};

function ProductCard({ product }) {
  return (
    <article className="group flex flex-col justify-between">
      <div className="relative flex h-[170px] xs:h-[190px] sm:h-[220px] md:h-[235px] items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-50/80 border border-neutral-100/80 p-2 sm:p-3 transition hover:shadow-md">
        <span className="absolute right-2 top-2 z-10 rounded-sm bg-[#ff641f] px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider">
          DEAL
        </span>

        {/* Full phone case image without cropping */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-1.5 sm:p-2.5 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="pt-2 sm:pt-3">
        <h3 className="truncate font-['Bagel_Fat_One'] text-xs sm:text-sm font-extrabold text-neutral-800">
          {product.name}
        </h3>

        <div className="mt-1 sm:mt-1.5 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm font-bold text-[#ff641f]">
            Rs. {product.price.toFixed(2)}
          </span>

          <span className="text-[10px] sm:text-xs text-neutral-400 line-through">
            Rs. {product.oldPrice.toFixed(2)}
          </span>
        </div>

        <button className="mt-2 sm:mt-3 w-full rounded-full bg-black py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold text-white transition hover:bg-[#ff641f] active:scale-98">
          Shop Now
        </button>
      </div>
    </article>
  );
}

function FeaturedProduct({ product }) {
  return (
    <article className="group flex flex-col justify-between">
      <div className="relative flex h-[260px] xs:h-[300px] sm:h-[370px] md:h-[400px] lg:h-[440px] items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-50/80 border border-neutral-100/80 p-3 sm:p-5 transition hover:shadow-md">
        <span className="absolute right-3 top-3 z-10 rounded-sm bg-[#ff641f] px-2 py-0.5 text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
          BEST DEAL
        </span>

        {/* Full featured phone case image without cropping */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-2 sm:p-4 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="pt-3 sm:pt-4">
        <h3 className="font-['Bagel_Fat_One'] text-sm sm:text-base md:text-lg font-black tracking-tight text-neutral-800">
          {product.name}
        </h3>

        <div className="mt-1 sm:mt-1.5 flex flex-wrap items-baseline gap-2">
          <span className="text-sm sm:text-base font-bold text-[#ff641f]">
            Rs. {product.price.toFixed(2)}
          </span>

          <span className="text-xs text-neutral-400 line-through">
            Rs. {product.oldPrice.toFixed(2)}
          </span>
        </div>

        <button className="mt-2.5 sm:mt-3.5 w-full rounded-full bg-black py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#ff641f] active:scale-98">
          Shop Now
        </button>
      </div>
    </article>
  );
}

export default function Bestsellers() {
  return (
    <section id="bestsellers" className="w-full bg-white px-3 xs:px-4 sm:px-6 md:px-10 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="font-['Bagel_Fat_One'] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-normal uppercase leading-tight tracking-tight text-[#484848]">
            Our
            <br />
            Bestsellers
          </h2>

          <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-gray-500">
            Turn heads with our latest collection of premium phone cases built to protect and impress.
          </p>
        </div>

        {/* Featured product + product grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.2fr_1fr]">
          <FeaturedProduct product={featuredProduct} />

          <div className="grid grid-cols-2 gap-x-3 xs:gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
