import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const menu = [
    { name: "Home", path: "/" },
    { name: "Phone Cases", path: "/?cat=tough" },
    { name: "Leather Cases", path: "/?cat=leather" },
    { name: "Customization", path: "/" },
    { name: "Card Wallet", path: "/" },
    { name: "Keychains", path: "/" },
    { name: "Pop Slider", path: "/" },
  ];

  const policies = [
    "Shipping Policy",
    "Replacement Policy",
    "Privacy Policy",
    "Terms of Service",
    "Contact Us",
    "About Us",
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-14 sm:pt-20 pb-8 px-4 sm:px-8 md:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center tracking-[0.3em] text-lg font-light">
            <span className="border border-[#c5a059] text-[#c5a059] px-1.5 py-0.5 mr-2 font-bold text-xs">
              S&C
            </span>
            <span className="font-heading text-[#c5a059] font-bold">SINGH & CHAND</span>
          </div>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Crafting luxury, dual-layer protective phone covers and premium leather accessories designed to elevate your everyday tech.
          </p>
          <div className="pt-2 flex gap-3 text-lg text-gray-400">
            {[FaInstagram, FaFacebookF, FaYoutube, FaPinterestP, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
                aria-label="Social Link"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Main Navigation */}
        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
            Main Menu
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
            {menu.map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="hover:text-[#c5a059] transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Customer Policies */}
        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
            {policies.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-[#c5a059] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Help & Contact */}
        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
            Direct Assistance
          </h4>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Have questions regarding your custom order or device compatibility?
          </p>
          <div className="space-y-2 text-xs text-gray-300">
            <p><span className="text-[#c5a059] font-bold">Email:</span> support@singhchand.com</p>
            <p><span className="text-[#c5a059] font-bold">Support Hours:</span> Mon - Sat (10am - 7pm)</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 tracking-wider">
        <p>© 2026 SINGH & CHAND. All Rights Reserved.</p>
        <p className="text-gray-400">
          Designed with <span className="text-[#c5a059]">✦</span> Luxury & Precision
        </p>
      </div>
    </footer>
  );
};

export default Footer;