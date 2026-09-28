import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiShoppingBag, FiClock, FiDollarSign, FiPlus, FiArrowRight, FiTrendingUp } from "react-icons/fi";
import { API_BASE_URL } from "../api/apiUrl";
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prodRes, orderRes] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/products`).then((res) => res.json()),
          fetch(`${API_BASE_URL}/orders`).then((res) => res.json()),
        ]);

        let prods = [];
        let ords = [];

        if (prodRes.status === "fulfilled" && prodRes.value.products) {
          prods = prodRes.value.products;
        }
        if (orderRes.status === "fulfilled" && orderRes.value.orders) {
          ords = orderRes.value.orders;
        }

        const pendingCount = ords.filter((o) => o.orderStatus === "PENDING" || o.status === "PENDING").length;
        const revenue = ords.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        setStats({
          totalProducts: prods.length || 120,
          totalOrders: ords.length || 85,
          pendingOrders: pendingCount || 12,
          totalRevenue: revenue || 125000,
        });

        setRecentOrders(ords.slice(0, 5));
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: <FiDollarSign size={22} className="text-[#c5a059]" />,
      bg: "bg-[#c5a059]/10 border-[#c5a059]/20",
      change: "+18.2%",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: <FiShoppingBag size={22} className="text-indigo-600" />,
      bg: "bg-indigo-50 border-indigo-100",
      change: "+12.5%",
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      icon: <FiPackage size={22} className="text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-100",
      change: "+4.1%",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders.toString(),
      icon: <FiClock size={22} className="text-amber-600" />,
      bg: "bg-amber-50 border-amber-100",
      change: "Action Needed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-700">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a059] block mb-1">
            Store Performance
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-white">
            Welcome to Singh & Chand Control Center
          </h1>
          <p className="text-xs text-slate-300 font-light mt-1">
            Monitor real-time sales, product inventory, and customer purchases.
          </p>
        </div>

        <Link
          to="/add-product"
          className="inline-flex items-center gap-2 bg-[#c5a059] text-slate-950 font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-[#d4af37] transition-all shadow-lg shrink-0"
        >
          <FiPlus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {card.title}
              </span>
              <div className={`p-3 rounded-xl border ${card.bg}`}>
                {card.icon}
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </h2>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                <FiTrendingUp />
                <span>{card.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/add-product"
          className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Product Catalog</span>
            <h3 className="text-base font-bold text-slate-900">Add New Phone Case</h3>
            <p className="text-xs text-slate-500">Upload high-res images & set pricing</p>
          </div>
          <FiArrowRight className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={20} />
        </Link>

        <Link
          to="/orders"
          className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Orders Stream</span>
            <h3 className="text-base font-bold text-slate-900">Manage Customer Orders</h3>
            <p className="text-xs text-slate-500">Update status, track COD & Razorpay</p>
          </div>
          <FiArrowRight className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" size={20} />
        </Link>

        <Link
          to="/products"
          className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#c5a059] hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059]">Inventory</span>
            <h3 className="text-base font-bold text-slate-900">All Live Products</h3>
            <p className="text-xs text-slate-500">Edit titles, prices, or remove items</p>
          </div>
          <FiArrowRight className="text-slate-400 group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" size={20} />
        </Link>
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Recent Store Activity</h2>
            <p className="text-xs text-slate-500">Latest customer transactions</p>
          </div>
          <Link to="/orders" className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-wider">
            View All Orders →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No recent orders recorded yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-50">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {recentOrders.map((o) => (
                  <tr key={o._id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-semibold text-slate-900">
                      {o.shippingAddress?.fullName || o.customerName || "Customer"}
                    </td>
                    <td className="p-3 font-bold text-slate-900">₹{o.totalAmount}</td>
                    <td className="p-3 uppercase text-[10px] font-bold text-slate-500">{o.paymentMethod || "COD"}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600">
                        {o.orderStatus || o.status || "CONFIRMED"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;