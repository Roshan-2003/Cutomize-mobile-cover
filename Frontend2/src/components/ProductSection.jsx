import React from "react";
import ProductCard from "./ProductCard";

const ProductSection = ({
  id,
  title,
  subtitle,
  products = [],
  showViewAll = false,
  showAll,
  onViewAll,
}) => {
  return (
    <section id={id} className="py-6 sm:py-10 md:py-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        {subtitle && (
          <span className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] block mb-1 sm:mb-1.5">
            {subtitle}
          </span>
        )}

        <h2 className="font-heading text-xl sm:text-2xl md:text-2.5xl lg:text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
          {title}
        </h2>

        <div className="h-0.5 w-12 sm:w-16 bg-[#c5a059] mx-auto mt-2.5 sm:mt-3 rounded-full" />
      </div>

      {/* Grid Display */}
      {products.length === 0 ? (
        <div className="text-center py-10 sm:py-14 bg-white rounded-xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-widest">
            New arrivals coming soon in this collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              {...product}
            />
          ))}
        </div>
      )}

      {/* View All CTA */}
      {showViewAll && !showAll && products.length > 0 && (
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            onClick={onViewAll}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 sm:px-10 sm:py-3.5 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white bg-black rounded-md overflow-hidden shadow-lg hover:bg-[#c5a059] hover:text-black transition-all duration-300 cursor-pointer"
          >
            <span>View All Products</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;