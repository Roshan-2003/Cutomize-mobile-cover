import React from "react";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Neon Bloom Case",
    image: "/images/9.png",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 2,
    name: "Blue Flower Case",
    image: "/images/5.webp",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 3,
    name: "Gingham Love Case",
    image: "/images/6.webp",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 4,
    name: "Sunny Skies Case",
    image: "/images/3.webp",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 5,
    name: "Love Meow Case",
    image: "/images/7.webp",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 6,
    name: "Diet Coke Pop Case",
    image: "/images/newimage.webp",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 7,
    name: "Orange Fruit Case",
    image: "/images/Orangefruitcase1.webp",
    price: 1199,
    oldPrice: 1499,
  },
];

export default function NewArrivals() {
  return (
    <section
      id="new-arrivals"
      className="w-full overflow-hidden bg-gradient-to-b from-white via-orange-50/15 to-white px-3 xs:px-4 sm:px-6 md:px-10 py-12 sm:py-16 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#ff4d2d]">
              Fresh Drops
            </p>
            <h2 className="mt-1 font-['Bagel_Fat_One'] text-3xl xs:text-4xl sm:text-5xl font-normal uppercase leading-tight tracking-tight text-slate-900">
              New{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d2d] via-[#f43f5e] to-orange-400">
                Arrivals
              </span>
            </h2>
          </div>

          <a
            href="#bestsellers"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#ff4d2d] hover:text-[#f43f5e] uppercase tracking-wider transition ml-2"
          >
            <span>View all</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Product grid: 2 cols mobile, 3 cols tablet, 4 cols desktop (2 rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="w-full relative rounded-2xl  border border-slate-200/90  sm:p-3 shadow-sm hover:border-[#ff4d2d]/60 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product image container */}
              {/* <div className="relative flex h-[150px] xs:h-[170px] sm:h-[210px] md:h-[240px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-slate-50 to-orange-50/20 border border-slate-100 p-2 sm:p-3"> */}
                <span className="absolute right-2 top-2 z-10 rounded-md bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e]  text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider shadow-xs">
                  SAVE ₹500
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-contain  drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
              {/* </div> */}

              {/* Product details */}
              <div className="pt-3">
                <h3 className="truncate font-['Bagel_Fat_One'] text-xs sm:text-sm font-extrabold text-slate-900  transition-colors">
                  {product.name}
                </h3>

                <div className="mt-1 sm:mt-1.5 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm font-black text-[#ff4d2d]">
                    Rs. {product.price.toLocaleString("en-IN")}.00
                  </span>

                  <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                    Rs. {product.oldPrice.toLocaleString("en-IN")}.00
                  </span>
                </div>

                <button className="mt-2.5 sm:mt-3 w-full rounded-full bg-gradient-to-r from-slate-950 to-slate-800 cursor-pointer py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold text-white shadow-md hover:shadow-orange-500/20 transition-all duration-300 active:scale-98">
                  Shop Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}