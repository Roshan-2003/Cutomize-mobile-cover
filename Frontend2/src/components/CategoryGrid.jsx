import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Leather Cases",
    img: "https://singhchand.com/cdn/shop/files/014.png?v=1760797976&width=1080",
  },
  {
    title: "Tough Case Double Layer",
    img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600",
  },
  {
    title: "Clear Cases",
    img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600",
  },
  {
    title: "Glass Phone Cases",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600",
  },
  {
    title: "MagSafe Cases",
    img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600",
  },
  {
    title: "Silicone Cases",
    img: "https://images.unsplash.com/photo-1601593346740-925612772716?w=600",
  },
  {
    title: "Printed Cases",
    img: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600",
  },
  {
    title: "Transparent MagSafe Cases",
    img: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600",
  },
  {
    title: "Rugged Armor Cases",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    title: "Luxury Designer Cases",
    img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600",
  },
  {
    title: "Carbon Fiber Cases",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
  },
  {
    title: "Custom Name Cases",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        {/* <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059] block mb-1">
          Bespoke Selection
        </span> */}
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-gray-900">
          Featured Categories
        </h2>
        <div className="h-0.5 w-16 bg-[#c5a059] mx-auto mt-3 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl h-[320px] sm:h-[380px] lg:h-[420px] shadow-md border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Background Image */}
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-white text-center transition-all duration-300 group-hover:via-black/50">
              <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 drop-shadow-md">
                {cat.title}
              </h3>

              <div>
                <a
                  href="#products-section"
                  className="inline-block border border-[#fff] bg-black/50 text-[#fff] px-6 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] rounded-md transition-all duration-300  shadow-lg"
                >
                  View Collection
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;