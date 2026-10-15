import React, { useState, useContext } from "react";
import { FiMenu, FiSearch, FiUser, FiShoppingBag, FiX, FiChevronRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaPowerOff } from "react-icons/fa6";


const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      // scroll to product or navigation handling if desired
      const el = document.getElementById("products-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tough Cases", path: "/?cat=tough" },
    { name: "Leather Cases", path: "/?cat=leather" },
    { name: "iPhone 17 Series", path: "/?cat=iphone17" },
    { name: "CHAOS Drops", path: "/?cat=chaos" },
    { name: "Cart", path: "/cart" },
    { name: "Orders", path: "/orders" },
    ...(user ? [] : [{ name: "Sign In / Sign Up", path: "/auth" }]),
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav border-b border-white/10 text-white transition-all duration-300">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex justify-between items-center bg-black">
          
          {/* Left: Mobile Menu & Search Icon */}
          <div className="flex items-center gap-3 sm:gap-5 text-lg sm:text-xl">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 text-[#c5a059] transition-all cursor-pointer focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              <FiMenu size={22} />
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-white/10 hover:text-[#c5a059] transition-all cursor-pointer focus:outline-none"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
          </div>

          {/* Center: Brand Logo */}
          <Link
            to="/"
            className="flex items-center tracking-[0.2em] sm:tracking-[0.35em] text-base sm:text-xl font-light cursor-pointer group select-none"
          >
          
            <span className="font-heading font-semibold bg-gradient-to-r from-white via-[#f0f0f0] to-[#c5a059] bg-clip-text text-transparent">
Designocase            </span>
          </Link>

          {/* Right: User & Cart Icons */}
          <div className="flex gap-2 sm:gap-4 text-lg sm:text-xl items-center">
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/orders"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-200 transition"
                  title="View your orders"
                >
                  <FiUser className="text-[#c5a059]" size={15} />
                  <span>{user.name ? `Hi, ${user.name.split(" ")[0]}` : "Account"}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-[11px] uppercase tracking-wider cursor-pointer text-gray-400 hover:text-white px-2 py-1 transition"
                  title="Sign out"
                >
               <FaPowerOff size={17} />

                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#c5a059] text-xs font-bold uppercase tracking-wider text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition"
              >
                <FiUser size={22} className="cursor-pointer"/>
                <span>Sign In</span>
              </Link>
            )}

            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="relative p-2 rounded-lg cursor-pointer group transition-all"
            >
              <FiShoppingBag size={22} className="transition-colors cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#c5a059] text-black text-[10px] font-extrabold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-white/10 bg-black/95 py-3 px-4 sm:px-12 transition-all">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <FiSearch className="text-[#c5a059] text-lg shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium cases, accessories, models..."
                className="w-full bg-transparent text-white placeholder-gray-400 text-sm outline-none py-1"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-white p-1 text-sm uppercase tracking-wider font-semibold"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0  backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Sidebar */}
          <div className="relative w-4/5 max-w-sm bg-[#0f0f11] border-r border-white/10 text-white h-full flex flex-col justify-between z-10 shadow-2xl animate-in slide-in-from-left duration-300">
            <div>
              {/* Header inside drawer */}
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="border border-[#c5a059] text-[#c5a059] px-1 font-bold text-xs">
                    S&C
                  </span>
                  <span className="font-heading font-semibold text-sm tracking-widest text-[#c5a059]">
                    NAVIGATION
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              {user && (
                <div className="px-5 py-3.5 bg-white/5 border-b border-white/10 flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center font-bold text-sm border border-[#c5a059]/40">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">{user.name || "Customer"}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email || "Signed In"}</p>
                  </div>
                </div>
              )}

              <nav className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-white/5 hover:text-[#c5a059] text-sm font-medium tracking-wider uppercase transition-colors"
                  >
                    <span>{link.name}</span>
                    <FiChevronRight className="text-gray-500 text-xs" />
                  </Link>
                ))}
              </nav>
              {user && (
                <div className="px-4 pt-2">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-[#c5a059] transition"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>


            {/* Footer inside drawer */}
            <div className="p-5 border-t border-white/10 bg-black/40 text-center text-xs text-gray-400 space-y-3">
              <p className="tracking-widest uppercase text-[#c5a059]">Singh & Chand Luxury</p>
              <p>© 2026 Premium Mobile Accessories</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
