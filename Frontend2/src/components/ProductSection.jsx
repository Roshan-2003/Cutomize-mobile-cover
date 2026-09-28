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
    <section id={id} className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        {subtitle && (
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.3em] text-[#c5a059] block mb-1">
            {subtitle}
          </span>
        )}

        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-wider">
          {title}
        </h2>

        <div className="h-0.5 w-14 bg-[#c5a059] mx-auto mt-3 rounded-full" />
      </div>

      {/* Grid Display */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
            New arrivals coming soon in this collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              {...product}
            />
          ))}
        </div>
      )}


<p>{products.discount}</p>
<p>{products.material}</p>
      {/* View All CTA */}
      {showViewAll && !showAll && products.length > 0 && (
        <div className="flex justify-center mt-10 sm:mt-14">
          <button
            onClick={onViewAll}
            className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-white bg-black rounded-md overflow-hidden shadow-lg hover:bg-[#c5a059] hover:text-black transition-all duration-300 cursor-pointer"
          >
            <span>View All Products</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;