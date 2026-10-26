import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
  const sliderRef = useRef(null);

  const scrollProducts = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

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

          <div className="flex items-center gap-3">
            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollProducts(-1)}
                aria-label="Previous products"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 border border-slate-200 shadow-md hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white hover:border-transparent transition-all duration-300 active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => scrollProducts(1)}
                aria-label="Next products"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 border border-slate-200 shadow-md hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white hover:border-transparent transition-all duration-300 active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <a
              href="#bestsellers"
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#ff4d2d] hover:text-[#f43f5e] uppercase tracking-wider transition ml-2"
            >
              <span>View all</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Product carousel */}
        <div className="relative group/slider">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-3 xs:gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth py-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <article
                key={product.id}
                className="w-[185px] xs:w-[210px] sm:w-[240px] md:w-[260px] lg:w-[calc((100%-72px)/4)] shrink-0 snap-start rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-4 shadow-sm hover:border-[#ff4d2d]/60 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Product image container */}
                <div className="relative flex h-[180px] xs:h-[200px] sm:h-[230px] md:h-[250px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-slate-50 to-orange-50/20 border border-slate-100 p-2 sm:p-3">
                  <span className="absolute right-2 top-2 z-10 rounded-md bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] px-2 py-0.5 text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider shadow-xs">
                    SAVE ₹500
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-1.5 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product details */}
                <div className="pt-3">
                  <h3 className="truncate font-['Bagel_Fat_One'] text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#ff4d2d] transition-colors">
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

                  <button className="mt-2.5 sm:mt-3 w-full rounded-full bg-gradient-to-r from-slate-950 to-slate-800 hover:from-[#ff4d2d] hover:to-[#f43f5e] py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold text-white shadow-md hover:shadow-orange-500/20 transition-all duration-300 active:scale-98">
                    Shop Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
