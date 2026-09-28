import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiRefreshCw, FiShoppingBag } from "react-icons/fi";
import { getUserOrders } from "../api/orderApi";

const ORDER_STEPS = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

const Orders = () => {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(Boolean(userId));
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async (isRefresh = false) => {
    if (!userId) return;

    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const response = await getUserOrders(userId);
      if (!response.success) throw new Error(response.message || "Unable to load orders");
      setOrders(response.orders || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to load orders");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return undefined;

    loadOrders();
    const intervalId = window.setInterval(() => loadOrders(true), 30000);
    return () => window.clearInterval(intervalId);
  }, [loadOrders, userId]);

  return (
    <main className="min-h-[70vh] bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Singh &amp; Chand</p>
            <h1 className="font-heading text-3xl font-extrabold uppercase tracking-wider text-black sm:text-4xl">Your Orders</h1>
            <p className="mt-2 text-sm text-gray-600">Track the latest progress of your purchases.</p>
          </div>
          {userId && (
            <button
              type="button"
              onClick={() => loadOrders(true)}
              disabled={refreshing || loading}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-black px-5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Updating" : "Refresh status"}
            </button>
          )}
        </div>

        {!userId ? (
          <div className="py-20 text-center">
            <FiPackage className="mx-auto mb-4 text-gray-400" size={36} />
            <h2 className="text-xl font-bold text-black">Sign in to view your orders</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">Your order history is connected to the account used at checkout.</p>
            <Link to="/" className="mt-6 inline-flex min-h-11 items-center justify-center bg-black px-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800">
              Continue shopping
            </Link>
          </div>
        ) : loading ? (
          <div className="py-20 text-center text-sm font-semibold uppercase tracking-widest text-gray-500">Loading your orders...</div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button type="button" onClick={() => loadOrders(true)} className="mt-5 min-h-11 bg-black px-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800">Try again</button>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center">
            <FiShoppingBag className="mx-auto mb-4 text-gray-400" size={36} />
            <h2 className="text-xl font-bold text-black">No orders yet</h2>
            <p className="mt-2 text-sm text-gray-600">Your placed orders will appear here.</p>
            <Link to="/" className="mt-6 inline-flex min-h-11 items-center justify-center bg-black px-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800">Explore the collection</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {orders.map((order) => {
              const status = (order.orderStatus || "PLACED").toUpperCase();
              const isCancelled = status === "CANCELLED";
              const activeStep = ORDER_STEPS.indexOf(status);

              return (
                <article key={order._id} className="py-7 sm:py-9">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Order placed {formatDate(order.createdAt)}</p>
                      <p className="mt-1 break-all font-mono text-xs text-gray-500">#{order._id}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Order status</p>
                      <p className={`mt-1 text-sm font-extrabold uppercase tracking-wider ${isCancelled ? "text-red-700" : "text-black"}`}>{status}</p>
                    </div>
                  </div>

                  {isCancelled ? (
                    <div className="mt-6 border-l-2 border-red-700 bg-gray-50 px-4 py-3 text-sm text-gray-700">This order has been cancelled. Contact support if you need help.</div>
                  ) : (
                    <ol className="mt-7 grid grid-cols-4 gap-2" aria-label={`Order progress: ${status.toLowerCase()}`}>
                      {ORDER_STEPS.map((step, index) => {
                        const complete = activeStep >= index;
                        return (
                          <li key={step} className="min-w-0">
                            <div className={`h-1 ${complete ? "bg-black" : "bg-gray-200"}`} />
                            <p className={`mt-2 text-[9px] font-bold uppercase tracking-wider sm:text-[11px] ${complete ? "text-black" : "text-gray-400"}`}>{step}</p>
                          </li>
                        );
                      })}
                    </ol>
                  )}

                  <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div className="space-y-2">
                      {(order.items || []).map((item, index) => (
                        <div key={`${item.product || item.title}-${index}`} className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
                          <span className="font-medium text-gray-800">{item.title} <span className="text-gray-500">x{item.quantity}</span></span>
                          <span className="text-gray-600">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-3 sm:border-0 sm:pt-0 sm:text-right">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Total</p>
                      <p className="mt-1 text-lg font-extrabold text-black">{formatPrice(order.totalAmount)}</p>
                      <p className="mt-1 text-xs text-gray-500">{order.paymentMethod} · {order.paymentStatus}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;