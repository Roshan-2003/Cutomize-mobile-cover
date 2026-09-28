import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-gray-50/50">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-xl text-center">
        {/* Animated Checkmark */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6 border border-emerald-200 shadow-sm animate-pulse-subtle">
          <FiCheckCircle size={48} />
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-gray-900 mb-2">
          Order Confirmed!
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 font-light mb-6">
          Thank you for choosing <span className="font-semibold text-gray-800">Singh & Chand</span>. Your phone case is being handcrafted for dispatch.
        </p>

        {id && (
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8 text-left space-y-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">
              Reference Number
            </span>
            <span className="text-sm font-mono font-bold text-gray-800 break-all select-all">
              #{id}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            to="/orders"
            className="flex w-full items-center justify-center gap-2 border border-black bg-white py-4 text-xs font-extrabold uppercase tracking-[0.25em] text-black transition hover:bg-gray-100"
          >
            <span>Track your order</span>
          </Link>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-black text-white py-4 rounded-lg text-xs font-extrabold uppercase tracking-[0.25em] hover:bg-[#c5a059] hover:text-black transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiShoppingBag size={16} />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;