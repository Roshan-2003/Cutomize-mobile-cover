import { useEffect, useState } from "react";
import { FiShoppingBag, FiUser, FiPhone, FiMapPin, FiPackage, FiCalendar, FiClock, FiCheck, FiSmartphone } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.log("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      const data = await response.json();
      if (response.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "ALL") return true;
    const currentStatus = o.orderStatus || o.status || "CONFIRMED";
    return currentStatus.toUpperCase() === activeTab.toUpperCase();
  });

  const getStatusBadge = (status) => {
    const s = (status || "CONFIRMED").toUpperCase();
    switch (s) {
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "SHIPPED":
        return "bg-indigo-50 text-indigo-600 border-indigo-200";
      case "CANCELLED":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-amber-50 text-amber-600 border-amber-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase tracking-wider">
            Customer Orders ({filteredOrders.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Review incoming orders, customer details, device model selections, and dispatch statuses
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 bg-slate-200/70 p-1 rounded-xl overflow-x-auto max-w-full">
          {["ALL", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                activeTab === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Display */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200/80 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          Loading customer orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200/80 text-center text-xs font-medium text-slate-500">
          No orders found under "{activeTab}" status.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const addr = order.shippingAddress || {};
            const customerName = addr.fullName || order.customerName || "Customer";
            const phone = addr.phone || order.phone || "N/A";
            const addressText = addr.address
              ? `${addr.address}, ${addr.city}, ${addr.state} - ${addr.pincode}`
              : "No address specified";

            return (
              <div
                key={order._id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      <FiPackage size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        ORDER #{order._id?.slice(-8)}
                      </span>
                      <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{customerName}</span>
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-base font-extrabold text-slate-900 block">
                        ₹{order.totalAmount?.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {order.paymentMethod || "COD"} • {order.paymentStatus || "PENDING"}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <select
                      value={order.orderStatus || order.status || "CONFIRMED"}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-xs font-extrabold uppercase px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${getStatusBadge(
                        order.orderStatus || order.status
                      )}`}
                    >
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                {/* Body Row: Customer info & Items list */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs text-slate-600">
                  {/* Shipping Info (6 cols) */}
                  <div className="lg:col-span-6 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1">
                      Shipping Details
                    </span>
                    <p className="flex items-center gap-2 font-medium text-slate-800">
                      <FiPhone className="text-slate-400 shrink-0" />
                      <span>{phone}</span>
                    </p>
                    <p className="flex items-start gap-2 font-medium text-slate-700 leading-snug">
                      <FiMapPin className="text-slate-400 shrink-0 mt-0.5" />
                      <span>{addressText}</span>
                    </p>
                  </div>

                  {/* Order Items (6 cols) */}
                  <div className="lg:col-span-6 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1">
                      Purchased Items ({order.items?.length || 0})
                    </span>
                    {order.items && order.items.length > 0 ? (
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs border-b border-slate-200/50 pb-1.5 last:border-0">
                            <div>
                              <span className="font-bold text-slate-900 block leading-snug">
                                {item.title || item.product?.title || "Phone Case"} (×{item.quantity})
                              </span>
                              <span className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-indigo-50 text-indigo-600 border border-indigo-200">
                                <FiSmartphone size={10} />
                                <span>Model: {item.selectedModel || "iPhone 16 Pro Max"}</span>
                              </span>
                            </div>
                            <span className="font-extrabold text-slate-900 shrink-0 ml-2">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">Item details not logged.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;