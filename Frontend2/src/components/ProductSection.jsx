import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductSection = ({
  id,
  title,
  subtitle,
  products = [],
  showViewAll = false,
  categorySlug,
}) => {
  const navigate = useNavigate();

  const visibleProducts = products.slice(0, 8);

  return (
    <section
      id={id}
      className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10 md:py-14 lg:px-8"
    >
      <div className="mb-6 text-center sm:mb-8 md:mb-10">
        {subtitle && (
          <span className="mb-1.5 block text-xs font-extrabold tracking-widest text-[#c5a059]">
            {subtitle}
          </span>
        )}

        <h2 className="font-heading text-xl font-extrabold uppercase text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
          {title}
        </h2>

        <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-[#c5a059]" />
      </div>

      {visibleProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">
            New arrivals coming soon in this collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8">
          {visibleProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}

      {showViewAll && products.length > 8 && (
        <div className="mt-8 flex justify-center sm:mt-12">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/products/${categorySlug || encodeURIComponent(title)}`
              )
            }
            className="rounded-md bg-black px-6 py-3 text-xs cursor-pointer font-bold uppercase tracking-widest text-white transition hover:bg-[#c5a059] hover:text-black sm:px-10"
          >
            View All Products 
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;