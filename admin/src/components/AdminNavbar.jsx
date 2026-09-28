import React from "react";
import { FiMenu, FiBell, FiSearch, FiExternalLink } from "react-icons/fi";

const AdminNavbar = ({ onToggleSidebar }) => {

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition cursor-pointer focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={22} />
        </button>

        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-wide uppercase">
            Overview Dashboard
          </h2>
          <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
            Singh & Chand Luxury Store Management
          </p>
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Visit Store Button */}
        <a
          href="https://mobile-cover-store.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition text-slate-700"
        >
          <span>Live Store</span>
          <FiExternalLink size={14} />
        </a>

        {/* Notifications Icon */}
        <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition relative">
          <FiBell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Admin Badge */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
            A
          </div>
          <span className="text-xs font-bold text-slate-700 hidden md:inline">
            Administrator
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
