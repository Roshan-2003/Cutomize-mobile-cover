import React from "react";
import { Link } from "react-router-dom";
import { FiEye, FiShoppingBag } from "react-icons/fi";
import { API_ORIGIN } from "../api/apiUrl";

const ProductCard = ({ _id, image, title, price, originalPrice, discount, category }) => {
  const resolvedImage = image?.startsWith("http")
    ? image
    : `${API_ORIGIN}${image || ""}`;

  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 p-2 sm:p-3 transition-all duration-300 hover:shadow-xl hover:border-[#c5a059]/40 flex flex-col justify-between h-full">
      {/* Discount Badge */}
      {(discountPercent || hasDiscount) && (
        <span className="absolute top-3 left-3 z-10 bg-black text-[#c5a059] text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shadow-md">
          {discountPercent ? `${discountPercent}% OFF` : "SALE"}
        </span>
      )}

      {/* Product Image Link Container */}
      <Link to={`/product/${_id}`} className="block relative overflow-hidden rounded-lg bg-gray-50 aspect-square flex items-center justify-center p-3 mb-3">
        <img
          src={resolvedImage}
          alt={title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />

        {/* Hover Quick Action overlay */}
        {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="bg-white text-black p-2.5 rounded-full shadow-lg hover:bg-[#c5a059] hover:text-white transition-colors cursor-pointer" title="View Details">
            <FiEye size={16} />
          </span>
          <span className="bg-black text-white p-2.5 rounded-full shadow-lg hover:bg-[#c5a059] transition-colors cursor-pointer" title="Quick Add">
            <FiShoppingBag size={16} />
          </span>
        </div> */}
      </Link>

      {/* Product Details */}
      <div className="text-center px-1 flex flex-col flex-1 justify-between">
        <div>
          {category && (
            <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1 truncate">
              {category}
            </p>
          )}

          <Link to={`/product/${_id}`}>
            <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-900 line-clamp-2 leading-snug mb-2  transition-colors">
              {title}
            </h3>
          </Link>
        </div>

        {/* Price Row */}
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-center gap-2 flex-wrap">
          {originalPrice && (
            <span className="text-gray-400 line-through text-xs font-normal">
              ₹{originalPrice}
            </span>
          )}
          <span className="text-sm sm:text-base font-extrabold text-gray-900">
            ₹{price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;