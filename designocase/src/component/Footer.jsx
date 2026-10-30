import React from "react";
// import NewsletterGallery from "./NewsletterGallery";
// import {
//   Instagram,
//   Facebook,
//   Youtube,
//   ArrowUp,
// } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white">

      {/* Newsletter Gallery Section */}
      {/* <NewsletterGallery /> */}

      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold">
            DESIGNO<span className="text-orange-400">.CASE</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-400">
            Your phone deserves more than just protection.
            Discover unique designs, express your personality
            and make every moment stylish.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Quick Links</h3>

          <ul className="space-y-3 text-sm text-gray-400">
            {["Home", "Shop", "About Us", "Contact Us"].map((item) => (
              <li key={item}>
                <a href="#" className="transition hover:text-orange-400">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Customer Support</h3>

          <ul className="space-y-3 text-sm text-gray-400">
            {[
              "FAQs",
              "Track Your Order",
              "Refund Policy",
              "Shipping Policy",
              "Privacy Policy",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="transition hover:text-orange-400">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Follow Us</h3>

          <p className="text-sm leading-6 text-gray-400">
            Follow us for new collections, latest trends and exclusive offers.
          </p>

          {/* <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-orange-400 hover:bg-orange-500"
              >
                <Icon size={18} />
              </a>
            ))}
          </div> */}
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-12">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Designo.Case. All Rights Reserved.
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-orange-500 hover:text-white"
          >
            {/* <ArrowUp size={19} /> */}
          </button>

        </div>
      </div>

    </footer>
  );
};

export default Footer;