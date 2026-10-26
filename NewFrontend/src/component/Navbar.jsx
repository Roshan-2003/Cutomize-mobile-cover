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
    { label: "Collection", href: "#collection", icon: Grid },
    { label: "Accessories", href: "#accessories", icon: Tag },
    { label: "Contact", href: "#contact", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f45d19] shadow-md select-none">
      <nav className="relative mx-auto flex min-h-[58px] sm:min-h-[64px] max-w-7xl items-center justify-between px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 text-white">
        
        {/* Left: Mobile hamburger menu trigger (< 768px) */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar menu"
            className="rounded-lg p-1.5 hover:bg-white/15 transition active:scale-95"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Tablet & Desktop Nav Items (>= 768px) */}
        <div className="hidden md:flex md:items-center font-['Bagel_Fat_One'] md:gap-4 lg:gap-6">
          {/* Item 1: Home (Visible on Tablet and Desktop) */}
          <a
            href="#home"
            className="text-xl lg:text-sm font-extrabold tracking-wide uppercase transition hover:opacity-80 py-1"
          >
            Home
          </a>

          {/* Item 2: Best Seller (Visible on Tablet and Desktop) */}
          <a
            href="#bestsellers"
            className="text-xs lg:text-sm font-extrabold tracking-wide uppercase transition hover:opacity-80 py-1"
          >
            Best Seller
          </a>

          {/* Item 3: Watch & Shop (Hidden on tablet, visible on 1024px+ desktop) */}
        

          {/* Item 4: Collection (Hidden on tablet, visible on 1024px+ desktop) */}
          <a
            href="#collection"
            className="hidden lg:block text-xs lg:text-sm font-extrabold tracking-wide uppercase transition hover:opacity-80 py-1"
          >
            Collection
          </a>

          {/* "More" Dropdown Menu */}
          {/* On Tablet (768px-1023px): contains remaining 4 items (Watch & Shop, Collection, Accessories, Contact) */}
          {/* On Desktop (1024px+): contains last 2 items (Accessories, Contact) */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 text-xs lg:text-sm font-extrabold tracking-wide uppercase transition hover:opacity-80 py-1 cursor-pointer"
              aria-expanded={moreOpen}
              aria-haspopup="true"
            >
              <span>More</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div className="absolute left-0 lg:left-auto lg:right-0 top-full mt-2 w-48 rounded-xl bg-white text-neutral-800 shadow-2xl border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Tablet-only dropdown items (Watch & Shop, Collection) */}
                <a
                  href="#watch-shop"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-[#fff3eb] hover:text-[#f45d19] transition lg:hidden"
                >
                  <Tv size={15} className="text-[#f45d19]" />
                  <span>Watch & Shop</span>
                </a>
                <a
                  href="#collection"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-[#fff3eb] hover:text-[#f45d19] transition lg:hidden"
                >
                  <Grid size={15} className="text-[#f45d19]" />
                  <span>Collection</span>
                </a>

                {/* Common dropdown items (Accessories, Contact) - Last 2 fields */}
                <a
                  href="#accessories"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-[#fff3eb] hover:text-[#f45d19] transition"
                >
                  <Tag size={15} className="text-[#f45d19]" />
                  <span>Accessories</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-[#fff3eb] hover:text-[#f45d19] transition"
                >
                  <Phone size={15} className="text-[#f45d19]" />
                  <span>Contact</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Center brand logo */}
      <a
  href="#home"
  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-['Bagel_Fat_One']   text-lg font-black tracking-wide xs:text-xl sm:text-2xl"
>
  Designo.Case
</a>

        {/* Right action icons */}
        <div className="flex items-center gap-2.5 xs:gap-3 sm:gap-4 md:gap-5">
          <button
            aria-label="Search"
            className="rounded-full p-1.5 hover:bg-white/10 transition active:scale-95"
          >
            <Search size={20} className="sm:h-[22px] sm:w-[22px]" />
          </button>
          <button
            aria-label="Account"
            className="hidden sm:block rounded-full p-1.5 hover:bg-white/10 transition active:scale-95"
          >
            <UserRound size={20} className="sm:h-[22px] sm:w-[22px]" />
          </button>
          <button
            aria-label="Shopping bag"
            className="relative rounded-full p-1.5 hover:bg-white/10 transition active:scale-95"
          >
            <ShoppingBag size={20} className="sm:h-[22px] sm:w-[22px]" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#f45d19]">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Aside drawer */}
          <aside
            className="fixed inset-y-0 left-0 z-50 w-[280px] xs:w-[320px] max-w-[85vw] bg-[#f45d19] text-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden"
            aria-label="Mobile navigation sidebar"
          >
            {/* Aside Header */}
            <div>
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
                <a
                  href="#home"
                  onClick={() => setSidebarOpen(false)}
                  className="text-xl font-black tracking-tighter"
                >
                  Designo.Case
                </a>
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar"
                  className="rounded-lg p-1.5 hover:bg-white/15 transition active:scale-95"
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
                      className="flex items-center gap-3.5  px-4 py-3 rounded-xl text-sm font-extrabold tracking-wide uppercase transition hover:bg-white/15 active:scale-98"
                    >
                      <Icon size={18} className="text-white/90" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Aside Footer */}
            <div className="p-4 border-t border-white/20 bg-black/10">
              <div className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-white/95">
                <UserRound size={18} />
                <span>My Account</span>
              </div>
              <p className="mt-2 px-3 text-[11px] text-white/70">
                BUY 2 @1599, BUY 3 @1999 Deals Active
              </p>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}

export default Navbar;