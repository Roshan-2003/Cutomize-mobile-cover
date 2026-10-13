import { useEffect, useState } from "react";
import { FiMenu, FiBell, FiExternalLink } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { apiRequest } from "../api/apiClient";

const AdminNavbar = ({ onToggleSidebar }) => {
  const [orderCount, setOrderCount] = useState(0);
  const { pathname } = useLocation();
  const pageTitles = {
    "/": "Dashboard",
    "/add-product": "Add Product",
    "/products": "Products",
    "/orders": "Orders",
  };
  const pageTitle = pageTitles[pathname] || "Dashboard";

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const data = await apiRequest("/orders");
        if (!Array.isArray(data.orders)) {
          throw new Error("The orders API returned an invalid orders list.");
        }
        setOrderCount(data.orders.length);
      } catch (error) {
        console.error("Failed to load order count:", error);
      }
    };

    fetchOrderCount();
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100 transition cursor-pointer focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={22} />
        </button>

        <div>
          <h2 className="text-sm sm:text-base font-bold text-black tracking-wide uppercase">
            {pageTitle}
          </h2>
          
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Visit Store Button */}
        <a
          href="https://mobile-cover-store.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black   rounded-lg transition"
        >
          <span >Live Store</span>
          <FiExternalLink size={14} className="text-blue-600" />
        </a>

        {/* Notifications Icon */}
        <button
  type="button"
  className="relative flex h-10 w-10 items-center justify-center rounded-full  text-blue-600 transition-all duration-200 hover:bg-blue-100 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
  aria-label={`${orderCount} total orders`}
  title={`${orderCount} total orders`}
>
  <FiBell size={20} />

  {orderCount > 0 && (
    <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white shadow-sm">
      {orderCount > 99 ? "99+" : orderCount}
    </span>
  )}
</button>

        <div className="h-6 w-px bg-gray-200 hidden sm:block" />

        {/* Admin Badge */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center">
            A
          </div>
          <span className="text-xs font-bold text-gray-700 hidden md:inline">
            Administrator
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
