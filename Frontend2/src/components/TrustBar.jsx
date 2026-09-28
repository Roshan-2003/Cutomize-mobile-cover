import React from "react";
import { FiTruck, FiShield, FiRotateCcw, FiLock } from "react-icons/fi";

const TrustBar = () => {
  const items = [
    {
      icon: <FiTruck className="text-white" />,
      title: "Free Express Shipping",
      subtitle: "On all orders across India",
    },
    {
      icon: <FiShield className="text-white" />,
      title: "Lifetime Print Warranty",
      subtitle: "Non-fading premium finish",
    },
    {
      icon: <FiRotateCcw className="text-white" />,
      title: "7-Day Replacement",
      subtitle: "Hassle-free guarantee",
    },
    {
      icon: <FiLock className="text-white" />,
      title: "Secure Checkout",
      subtitle: "256-bit encrypted payment",
    },
  ];

  return (
    <div className="bg-black text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-12 border-y border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/60 hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="text-2xl sm:text-3xl p-3 rounded-full bg-black border border-white/30 mb-3 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              {item.title}
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-400 group-hover:text-gray-600 font-light transition-colors">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;