import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Home,
  Flame,
  Tv,
  Grid,
  Tag,
  Phone,
} from "lucide-react";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setMoreOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // All navigation items
  const allNavItems = [
    { label: "Home", href: "#home", icon: Home },
    { label: "Best Seller", href: "#bestsellers", icon: Flame },
    { label: "Watch & Shop", href: "#watch-shop", icon: Tv },
    { label: "Collection", href: "#collection", icon: Grid },
    { label: "Accessories", href: "#accessories", icon: Tag },
    { label: "Contact", href: "#contact", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/95 backdrop-blur-md text-white border-b border-white/10 shadow-lg select-none">
      <nav className="relative mx-auto flex min-h-[58px] sm:min-h-[64px] max-w-8xl items-center justify-between px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10">
        
        {/* Left: Mobile hamburger menu trigger (< 768px) */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar menu"
            className="rounded-lg p-1.5 hover:bg-white/10 text-white transition active:scale-95"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Tablet & Desktop Nav Items (>= 768px) */}
        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6 font-medium">
          {/* Item 1: Home (Visible on Tablet and Desktop) */}
          <a
            href="#home"
            className="text-xs lg:text-sm font-extrabold tracking-wider uppercase text-neutral-300 hover:text-[#ff4d2d] transition py-1"
          >
            Home
          </a>

          {/* Item 2: Best Seller (Visible on Tablet and Desktop) */}
          <a
            href="#bestsellers"
            className="text-xs lg:text-sm font-extrabold tracking-wider uppercase text-neutral-300 hover:text-[#ff4d2d] transition py-1"
          >
            Best Seller
          </a>

          {/* Item 3: Watch & Shop (Hidden on tablet, visible on 1024px+ desktop) */}
          <a
            href="#watch-shop"
            className="hidden lg:block text-xs lg:text-sm font-extrabold tracking-wider uppercase text-neutral-300 hover:text-[#ff4d2d] transition py-1"
          >
            Watch & Shop
          </a>

          {/* Item 4: Collection (Hidden on tablet, visible on 1024px+ desktop) */}
          <a
            href="#collection"
            className="hidden lg:block text-xs lg:text-sm font-extrabold tracking-wider uppercase text-neutral-300 hover:text-[#ff4d2d] transition py-1"
          >
            Collection
          </a>

          {/* "More" Dropdown Menu */}
          {/* On Tablet (768px-1023px): shows remaining 4 items (Watch & Shop, Collection, Accessories, Contact) */}
          {/* On Desktop (1024px+): shows last 2 items (Accessories, Contact) */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 text-xs lg:text-sm font-extrabold tracking-wider uppercase text-neutral-300 hover:text-[#ff4d2d] transition py-1 cursor-pointer"
              aria-expanded={moreOpen}
              aria-haspopup="true"
            >
              <span>More</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 text-[#ff4d2d] ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div className="absolute left-0 lg:left-auto lg:right-0 top-full mt-2 w-52 rounded-2xl bg-[#111625] text-white shadow-2xl border border-white/15 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                {/* Tablet-only dropdown items (Watch & Shop, Collection) */}
                <a
                  href="#watch-shop"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-neutral-300 hover:bg-white/10 hover:text-[#ff4d2d] transition lg:hidden"
                >
                  <Tv size={15} className="text-[#ff4d2d]" />
                  <span>Watch & Shop</span>
                </a>
                <a
                  href="#collection"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-neutral-300 hover:bg-white/10 hover:text-[#ff4d2d] transition lg:hidden"
                >
                  <Grid size={15} className="text-[#ff4d2d]" />
                  <span>Collection</span>
                </a>

                {/* Common dropdown items (Accessories, Contact) - Last 2 fields */}
                <a
                  href="#accessories"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-neutral-300 hover:bg-white/10 hover:text-[#ff4d2d] transition"
                >
                  <Tag size={15} className="text-[#ff4d2d]" />
                  <span>Accessories</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-neutral-300 hover:bg-white/10 hover:text-[#ff4d2d] transition"
                >
                  <Phone size={15} className="text-[#ff4d2d]" />
                  <span>Contact</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Center brand logo */}
        <a
          href="#home"
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-['Bagel_Fat_One'] text-xl xs:text-2xl sm:text-3xl font-black tracking-tight text-white hover:opacity-90 transition group"
        >
          <span>Designo</span>
          <span className="text-[#ff4d2d] group-hover:text-[#f43f5e] transition-colors">.</span>
          <span className="bg-gradient-to-r from-white via-white to-orange-200 bg-clip-text text-transparent">Case</span>
        </a>

        {/* Right action icons */}
        <div className="flex items-center gap-2.5 xs:gap-3 sm:gap-4 md:gap-5">
          <button
            aria-label="Search"
            className="rounded-full p-1.5 hover:bg-white/10 text-white transition active:scale-95"
          >
            <Search size={20} className="sm:h-[22px] sm:w-[22px]" />
          </button>
          <button
            aria-label="Account"
            className="hidden sm:block rounded-full p-1.5 hover:bg-white/10 text-white transition active:scale-95"
          >
            <UserRound size={20} className="sm:h-[22px] sm:w-[22px]" />
          </button>
          <button
            aria-label="Shopping bag"
            className="relative rounded-full p-1.5 hover:bg-white/10 text-white transition active:scale-95"
          >
            <ShoppingBag size={20} className="sm:h-[22px] sm:w-[22px]" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#f43f5e] text-[10px] font-black text-white shadow-sm">
              0
            </span>
          </button>
        </div>
      </nav>

      {/* MOBILE ASIDE BAR DRAWER (< 768px) */}
      {sidebarOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Aside drawer */}
          <aside
            className="fixed inset-y-0 left-0 z-50 w-[280px] xs:w-[320px] max-w-[85vw] bg-[#0b0f19] text-white border-r border-white/10 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden"
            aria-label="Mobile navigation sidebar"
          >
            {/* Aside Header */}
            <div>
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <a
                  href="#home"
                  onClick={() => setSidebarOpen(false)}
                  className="font-['Bagel_Fat_One'] text-xl font-black tracking-tight text-white"
                >
                  <span>Designo</span>
                  <span className="text-[#ff4d2d]">.</span>
                  <span>Case</span>
                </a>
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar"
                  className="rounded-lg p-1.5 hover:bg-white/10 text-white transition active:scale-95"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Aside Navigation Links */}
              <nav className="flex flex-col py-3 px-3 gap-1">
                {allNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-extrabold tracking-wide uppercase text-neutral-300 hover:bg-white/10 hover:text-[#ff4d2d] transition active:scale-98"
                    >
                      <Icon size={18} className="text-[#ff4d2d]" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Aside Footer */}
            <div className="p-4 border-t border-white/10 bg-slate-950/80">
              <div className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-neutral-300">
                <UserRound size={18} className="text-[#ff4d2d]" />
                <span>My Account</span>
              </div>
              <div className="mt-2.5 mx-2 rounded-xl bg-gradient-to-r from-[#ff4d2d]/20 to-[#f43f5e]/20 border border-[#ff4d2d]/40 p-2.5 text-center">
                <p className="text-[11px] font-bold text-white">
                  🔥 BUY 2 @1599, BUY 3 @1999
                </p>
                <p className="text-[10px] text-amber-300 font-extrabold mt-0.5">
                  FREE GIFTS INCLUDED
                </p>
              </div>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}

export default Navbar;