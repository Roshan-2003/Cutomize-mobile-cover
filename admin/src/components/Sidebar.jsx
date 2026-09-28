import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiPlusSquare, FiPackage, FiShoppingBag, FiX, FiShield } from "react-icons/fi";

const Sidebar = ({ isOpen, onClose }) => {
  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiGrid size={18} />,
    },
    {
      name: "Add Product",
      path: "/add-product",
      icon: <FiPlusSquare size={18} />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <FiPackage size={18} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FiShoppingBag size={18} />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 text-slate-100 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="h-16 px-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <FiShield size={18} />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-wider uppercase text-white">
                  SINGH & CHAND
                </h1>
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-widest">
                  Admin Panel
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close Sidebar"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Menu Management
            </p>
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer Admin Info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-slate-200 truncate">Store Manager</p>
              <p className="text-[10px] text-slate-400 truncate">admin@singhchand.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;