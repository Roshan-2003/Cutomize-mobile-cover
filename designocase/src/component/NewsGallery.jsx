
import React, { useState } from "react";
import images3 from "../../public/images/footer.png";

import { FiMail, FiSend } from "react-icons/fi";

const NewsletterGallery = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success(
      "Thank you for subscribing! 10% coupon sent to your inbox.",
      {
        style: {
          background: "#0f0f11",
          color: "#c5a059",
          border: "1px solid #c5a059",
        },
      }
    );

    setEmail("");
  };

  const handlesubmit = () =>{
    console.log("hello")
  }

  return (
    <section className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50 py-10 sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 lg:flex-row lg:gap-12 lg:px-12">

        {/* Left: Sign up Form */}
        <div className="flex w-full flex-col justify-center rounded-2xl border border-[#c5a059]/30 bg-black p-6 text-white shadow-xl sm:p-10 lg:w-1/2">

          <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059]">
            <FiMail />
            <span>VIP Access</span>
          </div>

          <h2 className="mb-4 font-heading text-xl font-bold uppercase leading-snug tracking-wider sm:text-2xl lg:text-3xl">
            Unlock 10% Off Your First Purchase
          </h2>

          <p className="mb-8 text-xs font-light leading-relaxed text-gray-300 sm:text-sm">
            Subscribe to receive secret drops, luxury collection launches,
            and exclusive member-only offers directly to your inbox.
          </p>

          <form
            onSubmit={handlesubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-grow rounded-md border border-white/20 bg-white/10 px-4 py-3.5 text-xs text-white outline-none transition-colors placeholder:text-gray-400 focus:border-[#c5a059] sm:text-sm"
              required
            />

            <button
              type="submit"
              className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#c5a059] px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.2em] text-black shadow-lg transition-all hover:bg-[#d4af37]"
            >
              <span>Subscribe</span>
              <FiSend size={14} />
            </button>
          </form>
        </div>

        {/* Right: Gallery Banner */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xl lg:w-1/2">
          <img
            src={images3}
            alt="Singh & Chand Gallery"
            className="max-h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default NewsletterGallery;

