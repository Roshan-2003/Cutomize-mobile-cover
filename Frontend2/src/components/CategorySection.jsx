import React from "react";

const categories = [
  {
    id: 1,
    name: "Glass Cases",
    img: "https://images.unsplash.com/photo-1603313011107-1fae45b6e9b7?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Stride Cases",
    img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Silicon Cases",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Card Wallet",
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Pop Slider",
    img: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Printed Cases",
    img: "https://images.unsplash.com/photo-1603313011107-1fae45b6e9b7?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 7,
    name: "Premium Cases",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
  },
];

function CategorySection() {
  const sliderItems = [...categories, ...categories];

  return (
    <section className="w-full overflow-hidden bg-white from-slate-50 via-white to-slate-50 py-10 sm:py-16 md:py-20  border-gray-100">
      
      {/* Heading */}
      <div className="mb-8 sm:mb-12 px-4 text-center max-w-3xl mx-auto">
        {/* <p className="mb-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059]">
          Explore Collections
        </p> */}

        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
          Shop By Category
        </h2>

        <div className="h-0.5 w-16 bg-[#c5a059] mx-auto mt-3 mb-3 rounded-full" />

        <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light">
          Bespoke craftsmanship & precision protection designed for your daily aesthetic.
        </p>
      </div>

      {/* Slider Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-24 md:w-36 bg-gradient-to-r from-white to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-24 md:w-36 bg-gradient-to-l from-white to-transparent" />

        {/* Moving Container */}
        <div className="flex w-max gap-4 sm:gap-6 md:gap-8 animate-marquee hover:[animation-play-state:paused] py-4">
          {sliderItems.map((category, index) => (
            <div
              key={`${category.id}-${index}`}
              className="group flex w-28 sm:w-36 md:w-44 shrink-0 cursor-pointer flex-col items-center transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Image Thumbnail */}
              <div className="relative h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-full bg-gray-100 p-1 ring-2 ring-gray-200/80 transition-all duration-500 group-hover:ring-[#c5a059] group-hover:shadow-xl group-hover:scale-105">
                <img
                  src={category.img}
                  alt={category.name}
                  className="h-full w-full rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <h3 className="mt-3 sm:mt-4 text-center text-xs sm:text-sm font-semibold tracking-wider text-gray-800 transition-colors duration-300 group-hover:text-[#c5a059] uppercase">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;