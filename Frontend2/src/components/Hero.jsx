import React from "react";
import image2 from "../../public/carprice.png";

function Hero() {
  const scrollToProducts = () => {
    const el = document.getElementById("products-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // <section className="relative w-full overflow-hidden bg-black text-white">
    //   {/* Main Hero Container */}
    //   <div className="relative min-h-[480px] sm:min-h-[80px] lg:min-h-[680px] flex items-center justify-center">
    //     {/* Background Image with Overlay */}
    //     <div className="absolute inset-0 z-0">
    //       <img
    //         src={image2}
    //         alt="Trackline Edition Phone Cases"
    //         className="w-full h-full object-cover object-center opacity-85 scale-105 transition-transform duration-1000"
    //       />
    //       {/* Subtle gradient overlay to enhance text readability */}
    //       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
    //     </div>

    //     {/* Hero Content Box */}
    //     <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-16 flex flex-col items-center">

    //       {/* Rating Pill */}
    //       {/* <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/60 border border-[#c5a059]/50 backdrop-blur-md mb-4 sm:mb-6 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#c5a059]">
    //         <div className="flex text-amber-400">
    //           {[...Array(5)].map((_, i) => (
    //             <FiStar key={i} className="fill-current text-xs" />
    //           ))}
    //         </div>
    //         <span>Over 50,000+ Cases Delivered</span>
    //       </div> */}

    //       {/* Headline */}
    //       {/* <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider uppercase leading-tight sm:leading-tight mb-4 max-w-4xl bg-gradient-to-r from-white via-gray-100 to-[#c5a059] bg-clip-text text-transparent drop-shadow-lg">
    //         Supreme Protection. Unmatched Luxury.
    //       </h1> */}

    //       {/* Subtitle */}
    //       {/* <p className="text-xs sm:text-base md:text-lg text-gray-300 max-w-2xl font-light tracking-wide mb-8 px-2">
    //         Engineered with military-grade dual layer armor, precision cutouts, and bespoke craftsmanship for your iPhone.
    //       </p> */}

    //       {/* Action CTA Buttons */}
    //       {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4">
    //         <button
    //           onClick={scrollToProducts}
    //           className="w-full sm:w-auto px-8 py-4 text-black bg-white font-extrabold text-xs sm:text-sm uppercase tracking-[0.25em] rounded-md shadow-xl  active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 group"
    //         >
    //           <span>Explore Collection</span>
    //           <FiArrowRight className=" transition-transform" />
    //         </button>

    //         <Link
    //           to="/cart"
    //           className="w-full sm:w-auto px-8 py-4 border-2 border-white/80 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.25em] rounded-md backdrop-blur-sm  hover:border-white transition-all cursor-pointer text-center"
    //         >
    //           View Cart
    //         </Link>
    //       </div> */}

    //       {/* Trust points */}
    //       <div className="mt-8 sm:mt-12 flex items-center justify-center gap-6 sm:gap-10 text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">
    //         <div className="flex items-center gap-2">
    //           <FiShield className="text-[#c5a059] text-sm" />
    //           <span>Dual-Layer Armor</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <span className="h-1.5 w-1.5 rounded-full bg-[#c5a059]" />
    //           <span>Camera Protection</span>
    //         </div>
    //       </div>

    //     </div>
    //   </div>

    //   {/* Promotional Ticker Ribbon */}
    //   {/* <div className="bg-gradient-to-r from-black via-[#1a160e] to-black py-3 sm:py-4 border-y border-[#c5a059]/30 text-center">
    //     <p className="flex items-center justify-center gap-2 px-4 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#c5a059]">
    //       <span className="inline-block animate-bounce">🏎️</span>
    //       <span>NEW TRACKLINE EDITION & IPHONE 17 SERIES NOW LIVE</span>
    //       <span className="inline-block animate-bounce">🏎️</span>
    //     </p>
    //   </div> */}
    // </section>

    <section className="relative w-full">
      <img
        src={image2}
        alt="Trackline Edition phone cases promotion"
        className="block h-auto w-full"
      />
      <button
        type="button"
        onClick={scrollToProducts}
        aria-label="Shop Trackline phone cases"
        className="absolute left-[49.7%] top-[88.5%] flex h-[clamp(30px,7.2vw,55px)] w-[clamp(54px,10.2vw,186px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[clamp(8px,1vw,16px)] font-bold text-black shadow-md transition-all duration-200 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        SHOP NOW
      </button>
    </section>
  );
}

export default Hero;
