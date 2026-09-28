import React, { useState } from "react";
import images3 from "../../public/footer.png";
import toast from "react-hot-toast";
import { FiMail, FiSend } from "react-icons/fi";

const NewsletterGallery = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing! 10% coupon sent to your inbox.", {
      style: { background: "#0f0f11", color: "#c5a059", border: "1px solid #c5a059" },
    });
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left: Sign up Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 bg-black text-white rounded-2xl border border-[#c5a059]/30 shadow-xl flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-[#c5a059] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <FiMail />
            <span>VIP Access</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider mb-4 leading-snug">
            Unlock 10% Off Your First Purchase
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light mb-8 leading-relaxed">
            Subscribe to receive secret drops, luxury collection launches, and exclusive member-only offers directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="bg-white/10 text-white placeholder-gray-400 px-4 py-3.5 rounded-md text-xs sm:text-sm outline-none border border-white/20 focus:border-[#c5a059] flex-grow transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-[#c5a059] text-black px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.2em] rounded-md hover:bg-[#d4af37] transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Subscribe</span>
              <FiSend size={14} />
            </button>
          </form>
        </div>

        {/* Right: Gallery Banner */}
        <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-xl border border-gray-200">
          <img
            src={images3}
            alt="Singh & Chand Gallery"
            className="w-full h-full object-cover max-h-[380px] hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsletterGallery;
