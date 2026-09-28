import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getCart, getCartUserId } from "../api/cartApi";
import { createOrder } from "../api/orderApi";
import { useCart } from "../context/CartContext";
import { createPaymentOrder, verifyPayment } from "../api/paymentApi";
import { FiShield, FiLock, FiTruck, FiCreditCard, FiDollarSign, FiSmartphone } from "react-icons/fi";

// Helper function to dynamically load Razorpay SDK script if missing
const loadRazorpaySDK = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const { refreshCartCount } = useCart();

  const userId = getCartUserId();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart(userId);

        if (response.success) {
          setCart(response.cart);
        }
      } catch (error) {
        console.error("Checkout cart error:", error);
        toast.error("Unable to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnlinePayment = async () => {
    if (!userId) {
      toast.error("Please login first");
      return;
    }

    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    if (Object.values(cleanedFormData).some((value) => !value)) {
      toast.error("Please complete all shipping details");
      return;
    }

    if (!/^\d{10}$/.test(cleanedFormData.phone.replace(/[\s-]/g, ""))) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    if (!/^\d{6}$/.test(cleanedFormData.pincode)) {
      toast.error("Enter a valid 6-digit pincode");
      return;
    }

    try {
      setPlacingOrder(true);

      // Ensure Razorpay SDK is loaded
      const isSDKLoaded = await loadRazorpaySDK();
      if (!isSDKLoaded) {
        toast.error("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      // Step 1: Create Payment Order on Backend
      const response = await createPaymentOrder(cart.totalAmount);

      if (!response.success || !response.order) {
        toast.error(response.message || "Unable to create payment order", { duration: 6000 });
        return;
      }

      const razorpayOrder = response.order;
      const razorpayKeyId = response.keyId;

      if (!razorpayKeyId) {
        toast.error("Razorpay Key ID is missing. Set RAZORPAY_KEY_ID in Backend/.env");
        return;
      }

      // Step 2: Options for Razorpay Popup Modal
      const options = {
        key: razorpayKeyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        name: "SINGH & CHAND",
        description: "Luxury Phone Case Order",
        image: "/favicon.svg",
        order_id: razorpayOrder.id,
        handler: async function (paymentResponse) {
          try {
            // Step 3: Verify Signature on Backend
            const verifyResponse = await verifyPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });

            if (!verifyResponse.success) {
              toast.error("Payment verification failed");
              return;
            }

            // Step 4: Create Order in Database
            const orderResponse = await createOrder({
              user: userId,
              items: cart.items.map((item) => ({
                product: item.product._id,
                title: item.product.title,
                selectedModel: item.selectedModel || "iPhone 16 Pro Max",
                price: item.product.price,
                image: item.product.image,
                quantity: item.quantity,
              })),
              totalAmount: cart.totalAmount,
              shippingAddress: {
                ...cleanedFormData,
                phone: cleanedFormData.phone.replace(/[\s-]/g, ""),
              },
              paymentMethod: "ONLINE",
              paymentStatus: "PAID",
              orderStatus: "CONFIRMED",
              razorpayOrderId: paymentResponse.razorpay_order_id,
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
            });

            if (orderResponse.success) {
              await refreshCartCount();
              toast.success("Payment successful! Order placed.");
              navigate(`/order-success/${orderResponse.order._id}`);
              return;
            }

            toast.error(orderResponse.message || "Order creation failed");
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: cleanedFormData.fullName,
          contact: cleanedFormData.phone,
        },
        theme: {
          color: "#c5a059",
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment modal closed");
            setPlacingOrder(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      const backendErrorMsg =
        error.response?.data?.message || error.message || "Unable to start Razorpay payment";
      toast.error(backendErrorMsg, { duration: 6000 });
    } finally {
      setPlacingOrder(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please login first");
      return;
    }

    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      // ONLINE PAYMENT (RAZORPAY)
      if (paymentMethod === "ONLINE") {
        await handleOnlinePayment();
        return;
      }

      // COD PAYMENT
      if (paymentMethod === "COD") {
        const orderData = {
          user: userId,
          items: cart.items.map((item) => ({
            product: item.product._id,
            title: item.product.title,
            selectedModel: item.selectedModel || "iPhone 16 Pro Max",
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
          })),
          totalAmount: cart.totalAmount,
          paymentMethod: "COD",
          paymentStatus: "PENDING",
          orderStatus: "CONFIRMED",
          shippingAddress: {
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
        };

        const response = await createOrder(orderData);

        if (response.success) {
          await refreshCartCount();
          toast.success("Order confirmed successfully!");
          navigate(`/order-success/${response.order._id}`);
        }
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error(
        error.response?.data?.message || "Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Loading Checkout Details...
        </p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.25em] rounded hover:bg-[#c5a059] hover:text-black transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-widest mb-8 text-gray-900 text-center sm:text-left">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT - ADDRESS & PAYMENT FORM (7 cols) */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg">
            
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <FiTruck className="text-[#c5a059]" />
                <span>1. Shipping Information</span>
              </h2>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="e.g. Sushant Singh"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                Phone Number (10 digits) *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                inputMode="tel"
                pattern="[0-9]{10}"
                placeholder="e.g. 9876543210"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] transition"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                Delivery Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="House no., Street name, Landmark..."
                rows="3"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] transition"
              />
            </div>

            {/* City, State, Pincode in 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  maxLength="6"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  placeholder="6 digits"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-xs sm:text-sm outline-none focus:border-[#c5a059] transition"
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
                <FiLock className="text-[#c5a059]" />
                <span>2. Payment Option</span>
              </h2>

              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "COD" ? "border-[#c5a059] bg-[#c5a059]/5" : "border-gray-200 hover:border-gray-300"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#c5a059] h-4 w-4"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-xs sm:text-sm uppercase text-gray-900 flex items-center gap-2">
                      <FiDollarSign className="text-[#c5a059]" />
                      Cash on Delivery (COD)
                    </span>
                    <p className="text-[10px] text-gray-500">Pay cash upon delivery at your doorstep.</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "ONLINE" ? "border-[#c5a059] bg-[#c5a059]/5" : "border-gray-200 hover:border-gray-300"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#c5a059] h-4 w-4"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-xs sm:text-sm uppercase text-gray-900 flex items-center gap-2">
                      <FiCreditCard className="text-[#c5a059]" />
                      Razorpay Online Payment (UPI, Cards, Netbanking)
                    </span>
                    <p className="text-[10px] text-gray-500">Fast & 100% secure payment via Razorpay payment gateway.</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={placingOrder}
              className="w-full bg-black text-white py-4 rounded-lg text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] hover:bg-[#c5a059] hover:text-black transition-all duration-300 shadow-xl disabled:opacity-50 cursor-pointer"
            >
              {placingOrder ? "Processing..." : `Pay & Complete Order • ₹${cart.totalAmount?.toLocaleString()}`}
            </button>
          </form>

          {/* RIGHT - ORDER SUMMARY SIDEBAR (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg h-fit space-y-6">
            <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-gray-900 pb-4 border-b border-gray-100">
              Order Summary ({cart.items.length} {cart.items.length === 1 ? "Item" : "Items"})
            </h2>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {cart.items.map((item, idx) => (
                <div key={item._id || idx} className="flex gap-4 border-b border-gray-100 pb-4 items-center">
                  <div className="w-16 h-20 bg-gray-50 rounded p-1 border border-gray-100 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={
                        item.product?.image?.startsWith("http")
                          ? item.product.image
                          : `http://localhost:5000${item.product?.image || ""}`
                      }
                      alt={item.product?.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase text-gray-900 line-clamp-1">
                      {item.product?.title}
                    </h3>
                    
                    {/* Selected Model badge */}
                    <p className="text-[10px] font-extrabold text-[#c5a059] uppercase flex items-center gap-1 mt-0.5">
                      <FiSmartphone size={10} />
                      <span>{item.selectedModel || "iPhone 16 Pro Max"}</span>
                    </p>

                    <p className="text-[11px] text-gray-500 mt-0.5">
                      ₹{item.product?.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-extrabold text-xs sm:text-sm text-gray-900">
                    ₹{(item.product?.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">₹{cart.totalAmount?.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">
                Total Payable Amount
              </span>
              <span className="text-2xl font-black text-gray-900">
                ₹{cart.totalAmount?.toLocaleString()}.00
              </span>
            </div>

            <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 space-y-2 uppercase font-semibold text-center">
              <div className="flex items-center justify-center gap-2 text-[#c5a059]">
                <FiShield size={16} />
                <span>100% Buyer Protection & Razorpay Verified Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
