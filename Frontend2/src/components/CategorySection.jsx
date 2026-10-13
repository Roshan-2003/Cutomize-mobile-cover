import React from "react";

const categories = [
  {
    id: 1,
    name: "Glass Cases",
    img: "https://culltique.in/cdn/shop/files/case-website-mockup-1-1-21.jpg?v=1790703288&width=990",
  },
  {
    id: 2,
    name: "Stride Cases",
    img: "https://images.dailyobjects.com/marche/product-images/1101/dailyobjects-technicolour-stride-2-0-magsafe-case-cover-for-iphone-17-pro-images/Technicolour-Stride-2-0-magsafe-Case-Cover-For-iPhone-17-pro.png?tr=cm-pad_resize,v-3?tr=cm-pad_resize,v-3,q-auto,f-auto,w-1080,dpr-1",
  },
  {
    id: 3,
    name: "Silicon Cases",
    img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MM2C3?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=MGdJNGVDNVZtbzI4SHhWZGRlSU5JMmorYzFkTG5HaE9wejd5WUxYZjRMOG40akFYcTZIV1E2VzJyVUoyaXdaVjAyRHAxaGdEWHlNblVqYU1MWXYrQXc",
  },
  {
    id: 4,
    name: "Card Wallet",
    img: "https://images.mobilefun.co.uk/graphics/450pixelp/86971.jpg",
  },
  {
    id: 5,
    name: "Pop Slider",
    img: "https://m.media-amazon.com/images/I/41e9tBKro8L.jpg",
  },
  {
    id: 6,
    name: "Printed Cases",
    img: "https://cdn.nortvi.com/spai/q_glossy+ret_img+to_auto/nortvi.com/wp-content/uploads/2025/10/iPhone-17-ProMax-MidnightBlack4096px-1-2048x2048.jpg",
  },
  
];

function CategorySection() {
  const sliderItems = [...categories, ...categories];

  return (
    <section className="w-full overflow-hidden bg-white py-8 sm:py-12 md:py-16">
      {/* Heading */}
      <div className="mb-6 sm:mb-10 px-4 text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
          Shop By Category
        </h2>
        <div className="h-0.5 w-12 sm:w-16 bg-[#c5a059] mx-auto mt-2.5 sm:mt-3 rounded-full" />
      </div>

      {/* Slider Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 sm:w-16 md:w-28 bg-gradient-to-r from-white to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 sm:w-16 md:w-28 bg-gradient-to-l from-white to-transparent" />

        {/* Moving Container */}
        <div className="flex w-max gap-4 sm:gap-6 md:gap-8 animate-marquee hover:[animation-play-state:paused] py-3 sm:py-4">
          {sliderItems.map((category, index) => (
            <div
              key={`${category.id}-${index}`}
              className="group flex w-24 sm:w-32 md:w-40 shrink-0 cursor-pointer flex-col items-center transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Image Thumbnail */}
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-10 md:w-10 lg:h-28 lg:w-28 overflow-hidden rounded-full bg-gray-100 p-1 ring-2 ring-gray-200/80 transition-all duration-500 group-hover:ring-[#c5a059] group-hover:shadow-lg group-hover:scale-105">
                <img
                  src={category.img}
                  alt={category.name}
                  className="h-full w-full rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <h3 className="mt-2.5 sm:mt-3.5 text-center text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider text-gray-800 transition-colors duration-300  uppercase">
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