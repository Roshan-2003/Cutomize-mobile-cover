
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Glass Cases",
    slug: "glass",
    img: "https://culltique.in/cdn/shop/files/case-website-mockup-1-1-21.jpg?v=1790703288&width=990",
  },
  {
    id: 2,
    name: "Stride Cases",
    slug: "stride",
    img: "https://images.dailyobjects.com/marche/product-images/1101/dailyobjects-technicolour-stride-2-0-magsafe-case-cover-for-iphone-17-pro-images/Technicolour-Stride-2-0-magsafe-Case-Cover-For-iPhone-17-pro.png?tr=cm-pad_resize,v-3,q-auto,f-auto,w-1080,dpr-1",
  },
  {
    id: 3,
    name: "Silicon Cases",
    slug: "silicon",
    img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MM2C3?wid=2000&hei=2000&fmt=jpeg&qlt=90",
  },
  {
    id: 4,
    name: "Card Wallet",
    slug: "wallet",
    img: "https://images.mobilefun.co.uk/graphics/450pixelp/86971.jpg",
  },
  {
    id: 5,
    name: "Pop Slider",
    slug: "pop-slider",
    img: "https://m.media-amazon.com/images/I/41e9tBKro8L.jpg",
  },
  {
    id: 6,
    name: "Printed Cases",
    slug: "printed",
    img: "https://cdn.nortvi.com/spai/q_glossy+ret_img+to_auto/nortvi.com/wp-content/uploads/2025/10/iPhone-17-ProMax-MidnightBlack4096px-1-2048x2048.jpg",
  },
];

function CategorySection({ categories: savedCategories = [] }) {
  const savedCategoryFor = (category) =>
    savedCategories.find(
      (savedCategory) =>
        savedCategory.slug === category.slug ||
        savedCategory.name.toLowerCase() === category.name.toLowerCase()
    );

  const featuredCategories = categories.map((category) => {
    const savedCategory = savedCategoryFor(category);
    const images = savedCategory?.images?.length
      ? savedCategory.images
      : [savedCategory?.image].filter(Boolean);

    return savedCategory
      ? {
          ...category,
          ...savedCategory,
          id: savedCategory._id || category.id,
          img: images[0] || category.img,
          secondaryImg: images[1] || "",
        }
      : category;
  });

  const customCategories = savedCategories
    .filter(
      (savedCategory) =>
        !categories.some(
          (category) =>
            savedCategory.slug === category.slug ||
            savedCategory.name.toLowerCase() === category.name.toLowerCase()
        )
    )
    .map((category) => {
      const images = category.images?.length
        ? category.images
        : [category.image].filter(Boolean);

      return {
        ...category,
        id: category._id,
        img: images[0] || "",
        secondaryImg: images[1] || "",
      };
    });

  const sliderItems = [...featuredCategories, ...customCategories];
  const repeatedSliderItems = [...sliderItems, ...sliderItems];

  return (
    <section className="w-full overflow-hidden bg-white py-8 sm:py-12 md:py-16">
      <div className="mb-6 sm:mb-10 px-4 text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
          Shop By Category
        </h2>

        <div className="h-0.5 w-12 sm:w-16 bg-[#c5a059] mx-auto mt-3 rounded-full" />
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 sm:w-16 md:w-28 bg-gradient-to-r from-white to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 sm:w-16 md:w-28 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max gap-4 sm:gap-6 md:gap-8 animate-marquee hover:[animation-play-state:paused] py-3 sm:py-4">
          {repeatedSliderItems.map((category, index) => (
            <Link
              key={`${category.slug || category.id}-${index}`}
              to={`/?cat=${category.slug}`}
              className="group flex w-24 sm:w-32 md:w-40 shrink-0 cursor-pointer flex-col items-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 overflow-hidden rounded-full bg-gray-100 p-1 ring-2 ring-gray-200/80 transition-all duration-500 group-hover:ring-[#c5a059] group-hover:shadow-lg group-hover:scale-105">
                <img
                  src={category.img}
                  alt={category.name}
                  className={`h-full w-full rounded-full object-cover transition duration-700 group-hover:scale-110 ${
                    category.secondaryImg ? "group-hover:opacity-0" : ""
                  }`}
                />
                {category.secondaryImg && (
                  <img
                    src={category.secondaryImg}
                    alt={`${category.name} alternate`}
                    className="absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-full object-cover opacity-0 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                )}
              </div>

              <h3 className="mt-2.5 sm:mt-3.5 text-center text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider text-gray-800 uppercase">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
