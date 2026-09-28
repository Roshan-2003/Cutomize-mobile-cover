import React from "react";
import { FiShield, FiTruck, FiZap } from "react-icons/fi";

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-[#111111] via-[#221c13] to-[#111111] border-b border-[#c5a059]/30 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.25em] uppercase font-medium">
        
        {/* Left item - hidden on tiny mobile */}
        <div className="hidden md:flex items-center gap-2 text-[#c5a059]">
          <FiTruck className="text-sm" />
          <span>Free Express Shipping Across India</span>
        </div>

        {/* Center Main Message */}
        <div className="flex-1 md:flex-initial text-center flex items-center justify-center gap-2 font-semibold">
          <FiZap className="text-[#c5a059] animate-pulse" />
          <span className="bg-gradient-to-r from-white via-[#f3e5ab] to-[#c5a059] bg-clip-text text-transparent">
            New Drop: Tough Cases & iPhone 17 Series
          </span>
          <span className="hidden sm:inline text-xs text-[#c5a059] font-bold ml-1">
            | USE CODE: FREESHIP
          </span>
        </div>

        {/* Right item - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 text-[#c5a059]">
          <FiShield className="text-sm" />
          <span>Lifetime Print Warranty</span>
        </div>

      </div>
    </div>
  );
};

export default AnnouncementBar;