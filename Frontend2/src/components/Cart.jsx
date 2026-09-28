import React, { useEffect, useState } from "react";
import {
  getCart,
  getCartUserId,
  removeFromCart,
  updateCartQuantity,
} from "../api/cartApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiShoppingBag, FiTrash2, FiArrowRight, FiShield, FiLock, FiSmartphone } from "react-icons/fi";
import { API_ORIGIN } from "../api/apiUrl";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = getCartUserId();
  const navigate = useNavigate();

  const fetchCartData = async () => {
    try {
      const response = await getCart(userId);
      if (response.success) {
        setCart(response.cart);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleRemove = async (productId, selectedModel) => {
    try {
      await removeFromCart(userId, productId, selectedModel);
      toast.success("Item removed from cart");
      fetchCartData();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleUpdateQty = async (productId, newQty, selectedModel) => {
    if (newQty < 1) return;
    try {
      await updateCartQuantity(userId, productId, newQty, selectedModel);
      fetchCartData();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Loading Your Shopping Bag...
        </p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-6">
          <FiShoppingBag size={36} />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-widest text-gray-900 mb-3">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mb-8">
          Explore our latest collection of luxury phone covers and custom trackline editions to find your match.
        </p>
        <Link
          to="/"
          className="bg-black text-white px-10 py-4 text-xs font-extrabold uppercase tracking-[0.25em] rounded-md shadow-lg hover:bg-[#c5a059] hover:text-black transition-all"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-widest mb-8 text-gray-900 text-center sm:text-left">
          Shopping Cart ({cart.items.length} {cart.items.length === 1 ? "Item" : "Items"})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg space-y-6">
            {cart.items.map((item, idx) => (
              <div
                key={item._id || `${item.product?._id}-${item.selectedModel}-${idx}`}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-gray-100 pb-6 items-start sm:items-center justify-between"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 bg-gray-50 rounded-lg p-2 border border-gray-100 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={
                        item.product?.image?.startsWith("http")
                          ? item.product.image
                          : `${API_ORIGIN}${item.product?.image || ""}`
                      }
                      alt={item.product?.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product?._id}`}
                      className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-[#c5a059] transition-colors line-clamp-2"
                    >
                      {item.product?.title}
                    </Link>

                    {/* Selected Model Display Pill */}
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-1 bg-slate-900 text-[#c5a059] text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                        <FiSmartphone size={11} />
                        <span>Model: {item.selectedModel || "iPhone 16 Pro Max"}</span>
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1.5 font-semibold">
                      Unit Price: ₹{item.product?.price}
                    </p>
                    <button
                      onClick={() => handleRemove(item.product?._id, item.selectedModel)}
                      className="flex items-center gap-1.5 text-[10px] font-extrabold text-red-500 uppercase tracking-wider mt-3 hover:text-red-700 transition cursor-pointer"
                    >
                      <FiTrash2 size={13} />
                      <span>Remove Item</span>
                    </button>
                  </div>
                </div>

                {/* Controls & Total price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                  {/* Qty Counter */}
                  <div className="flex items-center rounded-md border border-gray-900 bg-white">
                    <button
                      onClick={() =>
                        handleUpdateQty(item.product?._id, item.quantity - 1, item.selectedModel)
                      }
                      className="px-3 py-1 text-xs font-bold hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-bold border-x border-gray-900 min-w-[32px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQty(item.product?._id, item.quantity + 1, item.selectedModel)
                      }
                      className="px-3 py-1 text-xs font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Total Amount */}
                  <span className="font-extrabold text-sm sm:text-base text-gray-900 min-w-[90px] text-right">
                    ₹{(item.product?.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <Link
                to="/"
                className="text-xs font-bold uppercase tracking-widest text-[#c5a059] hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg h-fit space-y-6">
            <h2 className="font-heading text-lg font-extrabold uppercase tracking-widest text-gray-900 pb-4 border-b border-gray-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">
                  ₹{cart.totalAmount?.toLocaleString()}.00
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                Total Amount
              </span>
              <span className="text-2xl font-black text-gray-900">
                ₹{cart.totalAmount?.toLocaleString()}.00
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-black text-white py-4 rounded-lg text-xs font-extrabold uppercase tracking-[0.25em] hover:bg-[#c5a059] hover:text-black transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <FiArrowRight size={16} />
            </button>

            <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 space-y-2 uppercase font-semibold text-center">
              <div className="flex items-center justify-center gap-2">
                <FiLock className="text-[#c5a059]" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
              <p>Free Returns & 7-Day Replacement Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
