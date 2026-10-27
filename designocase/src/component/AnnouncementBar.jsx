import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const offers = [
  {
    title: "Enjoy Free Shipping on All Orders",
    subtitle: "Fast & Secure Delivery Nationwide",
  },
  {
    title: "Extra 40% Off on Single Purchases",
    subtitle: "Limited Time · Sitewide Offer",
  },
  {
    title: "Flash Sale Buy 1 Get 2 Free",
    subtitle: "No Code Required | Explore Deals | T&C Apply",
  },
];

export default function AnnouncementBar() {
  const [activeOffer, setActiveOffer] = useState(0);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDirection("right");
      setActiveOffer((current) => (current + 1) % offers.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [activeOffer]);

  const prevOffer = () => {
    setDirection("left");
    setActiveOffer((current) => (current - 1 + offers.length) % offers.length);
  };

  const nextOffer = () => {
    setDirection("right");
    setActiveOffer((current) => (current + 1) % offers.length);
  };

  const offer = offers[activeOffer];

  return (
    <section className="relative flex min-h-[60px] items-center justify-center overflow-hidden bg-[#ff554e] px-12 py-2 text-center text-black sm:px-16">
      <button
        onClick={prevOffer}
        aria-label="Previous offer"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 hover:scale-125 sm:left-[18%]"
      >
        <ChevronLeft size={22} />
      </button>

      <div
        key={activeOffer}
        className={`offer-slide ${
          direction === "right" ? "slide-from-right" : "slide-from-left"
        }`}
      >
        <h2 className="text-[14px] font-bold">{offer.title}</h2>

        <p className="mt-[2px] text-[12px]">{offer.subtitle}</p>
      </div>

      <button
        onClick={nextOffer}
        aria-label="Next offer"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 hover:scale-125 sm:right-[18%]"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
}
