
import React from "react";
import { Search, UserRound, ShoppingBag, Menu } from "lucide-react";

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
  
 


//   MGFJ4
];

const featuredProduct = {
  name: "DIET COKE POP CASE",
  image: "/images/newimage.webp",
  price: 999,
  oldPrice: 1499,
};



function ProductCard({ product }) {
  return (
    <article className="group min-w-0">
      <div className="relative flex h-[190px] items-center justify-center overflow-hidden bg-white sm:h-[230px]">
        <span className="absolute right-2 top-2 z-10 bg-[#ff641f] px-2 py-1 text-[10px] font-bold text-white">
          DEAL
        </span>

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="pt-3">
        <h3 className="truncate font-['Bagel_Fat_One']   text-xs font-extrabold text-black sm:text-sm">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-[#ff641f]">
            Rs. {product.price.toFixed(2)}
          </span>

          <span className="text-[11px] text-gray-400 line-through">
            Rs. {product.oldPrice.toFixed(2)}
          </span>
        </div>

        <button className="mt-3 w-full rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#ff641f]">
          Shop Now
        </button>
      </div>
    </article>
  );
}

function FeaturedProduct({ product }) {
  return (
    <article className="group min-w-0">
      <div className="relative flex h-[310px] items-center justify-center overflow-hidden bg-white sm:h-[390px] lg:h-[420px]">
        <span className="absolute right-3 top-3 z-10 bg-[#ff641f] px-2 py-1 text-[10px] font-bold text-white">
          DEAL
        </span>

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="pt-3">
        <h3 className="text-base font-['Bagel_Fat_One']  font-black tracking-tight text-black sm:text-lg">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-[#ff641f]">
            Rs. {product.price.toFixed(2)}
          </span>

          <span className="text-[11px] text-gray-400 line-through">
            Rs. {product.oldPrice.toFixed(2)}
          </span>
        </div>

        <button className="mt-3 w-full rounded-full bg-black px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#ff641f]">
          Shop Now
        </button>
      </div>
    </article>
  );
}

export default function Bestsellers() {
  return (
    <main id="home" className="min-h-screen bg-white">

      <section
        id="bestsellers"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16"
      >
        {/* Section heading */}
        <div className="mb-9 text-center sm:mb-12">
        

          <h1 
  className="font-['Bagel_Fat_One'] text-6xl font-normal uppercase leading-[1.3] tracking-tight text-[#484848] sm:text-6xl" >
            Our
            <br />
            Bestsellers
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-500">
            Turn heads with our latest collection of premium phone
            cases built to protect and impress.
          </p>
        </div>

        {/* Featured product + product grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-[1.2fr_1fr]">
          <FeaturedProduct product={featuredProduct} />

          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
