import React from "react";
import { Mail, Phone, Truck, ShieldCheck, RotateCcw, CreditCard, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  const menu = [
    { name: "Home", href: "#home" },
    { name: "Bestsellers", href: "#bestsellers" },
    { name: "Watch & Shop", href: "#watch-shop" },
    { name: "New Arrivals", href: "#new-arrivals" },
    { name: "Reviews", href: "#customer-reviews" },
    { name: "Collection", href: "#collection" },
  ];

  const policies = [
    "Shipping Policy",
    "Replacement Policy",
    "Privacy Policy",
    "Terms of Service",
    "Track Your Order",
    "FAQs & Help",
  ];

  const trustBadges = [
    { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹999" },
    { icon: ShieldCheck, title: "Military Protection", desc: "Dual-layer drop tested" },
    { icon: RotateCcw, title: "7-Day Replacement", desc: "Hassle-free guarantee" },
    { icon: CreditCard, title: "Secure Checkout", desc: "256-Bit SSL Encrypted" },
  ];

  return (
    <footer className="relative bg-[#07090e] text-white pt-12 sm:pt-16 pb-8 border-t border-white/10 select-none">
      {/* Top Sunset Accent Line */}
      {/* <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff4d2d] to-transparent opacity-80" /> */}

      {/* Trust Badges Strip */}
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-3 sm:gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4d2d]/20 to-[#f43f5e]/20 text-[#ff4d2d] border border-[#ff4d2d]/30">
                  <Icon size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h4 className="font-['Bagel_Fat_One'] text-xs sm:text-sm text-white tracking-wide">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* Main 4-Column Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <a href="#home" className="inline-block font-['Bagel_Fat_One'] text-2xl font-black tracking-tight text-white group">
            <span>Designo</span>
            <span className="text-[#ff4d2d]">.</span>
            <span className="bg-gradient-to-r from-white via-neutral-100 to-orange-200 bg-clip-text text-transparent">Case</span>
          </a>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Crafting luxury, dual-layer protective phone covers and trendy lifestyle accessories designed to turn heads and elevate your everyday carry.
          </p>

          {/* Social Icons */}
          <div className="pt-2 flex gap-3 text-slate-400">
            {/* Instagram */}
            <a
              href="#"
              className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white hover:border-transparent transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white hover:border-transparent transition-all duration-300"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white hover:border-transparent transition-all duration-300"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="#"
              className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ff4d2d] hover:to-[#f43f5e] hover:text-white hover:border-transparent transition-all duration-300"
              aria-label="Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-['Bagel_Fat_One'] text-sm tracking-wider uppercase text-white mb-5">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {menu.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="hover:text-[#ff4d2d] transition-colors flex items-center gap-1.5 group">
                  <span className="h-1 w-1 rounded-full bg-[#ff4d2d] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div>
          <h4 className="font-['Bagel_Fat_One'] text-sm tracking-wider uppercase text-white mb-5">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {policies.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-[#ff4d2d] transition-colors flex items-center gap-1.5 group">
                  <span className="h-1 w-1 rounded-full bg-[#ff4d2d] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Newsletter & Contact */}
        <div className="space-y-4">
          <h4 className="font-['Bagel_Fat_One'] text-sm tracking-wider uppercase text-white mb-2">
            Stay in the Loop
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Get exclusive VIP discounts, early access drops, and free giveaway alerts.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff4d2d] transition"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="shrink-0 bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] hover:from-[#ff3a17] hover:to-[#e11d48] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition shadow-md shadow-orange-500/20 active:scale-95"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div className="pt-2 space-y-1.5 text-xs text-slate-300">
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-[#ff4d2d]" />
              <span>support@designocase.com</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-[#ff4d2d]" />
              <span>Mon - Sat (10am - 7pm IST)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2026 DESIGNO.CASE. All Rights Reserved.</p>
        <p className="flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart size={13} className="text-[#f43f5e] fill-current" />
          <span>for stylish cases</span>
        </p>
      </div>
    </footer>
  );
}
