import React from 'react';

function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-neutral-950 via-slate-900 to-neutral-950 px-3 py-2 sm:py-2.5 text-center font-['Bagel_Fat_One'] text-xs sm:text-sm text-white tracking-wider border-b border-white/10 shadow-sm">
      <span className="bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] bg-clip-text text-transparent font-black">
        BUY 2 @1599, BUY 3 @1999
      </span>
      <span className="mx-2 text-white/40">✦</span>
      <span className="text-amber-300 font-extrabold uppercase tracking-wide">
        FREE GIFTS INSIDE
      </span>
    </div>
  );
}

export default AnnouncementBar;
