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
