import { useEffect, useMemo, useState } from "react";
import { API_ORIGIN } from "../api/apiUrl";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addToCart, getCartUserId } from "../api/cartApi";
import { getProductById } from "../api/productApi";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import {
  FiShoppingBag,
  FiZap,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiStar,
  FiChevronRight,
  FiSmartphone,
} from "react-icons/fi";

const IMAGE_BASE_URL = API_ORIGIN;

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

const getImageUrl = (image) =>
  image?.startsWith("http") ? image : `${IMAGE_BASE_URL}${image || ""}`;

const IPHONE_MODELS = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 17",
  "iPhone 17 Air",
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 16 Plus",
  "iPhone 16",
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  "iPhone 15 Plus",
  "iPhone 15",
  "iPhone 14 Pro Max",
  "iPhone 14 Pro",
  "iPhone 14",
  "iPhone 13 Pro Max",
  "iPhone 13",
];

const SAMSUNG_MODELS = [
  "Samsung Galaxy S25 Ultra",
  "Samsung Galaxy S25+",
  "Samsung Galaxy S25",
  "Samsung Galaxy S24 Ultra",
  "Samsung Galaxy S24+",
  "Samsung Galaxy S24",
  "Samsung Galaxy S23 Ultra",
  "Samsung Galaxy S23+",
  "Samsung Galaxy S23",
  "Samsung Galaxy Z Fold 6",
  "Samsung Galaxy Z Flip 6",
];

const ProductDetails = () => {
  const { id } = useParams();
  const { refreshCartCount } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 16 Pro Max");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Could not load product details.");
        toast.error("Failed to load product!");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const totalPrice = useMemo(
    () => (product ? product.price * quantity : 0),
    [product, quantity],
  );

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    if (brand === "Apple") {
      setSelectedModel(IPHONE_MODELS[4]); // iPhone 16 Pro Max
    } else {
      setSelectedModel(SAMSUNG_MODELS[3]); // Samsung Galaxy S24 Ultra
    }
  };

  const handleAddToCart = async (redirectToCart = false) => {
    const userId = getCartUserId();

    if (!userId) {
      toast.error("User session expired. Please refresh.", { icon: "👤" });
      return;
    }

    if (!selectedModel) {
      toast.error("Please select your phone model number!");
      return;
    }

    try {
      setAddingToCart(true);
      const response = await addToCart(
        userId,
        product._id,
        quantity,
        selectedModel,
      );

      if (response.success) {
        toast.success(`${product.title} (${selectedModel}) added to cart!`, {
          style: {
            borderRadius: "10px",
            background: "#0f0f11",
            color: "#c5a059",
            border: "1px solid #c5a059",
          },
        });

        if (refreshCartCount) refreshCartCount();
        if (redirectToCart) navigate("/cart");
      } else {
        throw new Error(response.message || "Failed to add to cart");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to add to cart",
      );
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Loading Luxury Case Details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold uppercase tracking-widest text-red-500 mb-4">
          {error || "Product Not Found"}
        </h2>
        <Link
          to="/"
          className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded hover:bg-[#c5a059] hover:text-black transition"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const imageUrl = getImageUrl(product.image);
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="bg-gray-50/50 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <FiChevronRight size={12} />
          <span className="text-gray-400">{product.category || "Cases"}</span>
          <FiChevronRight size={12} />
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Gallery (6 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto">
            <button className="h-20 w-20 shrink-0 rounded-lg border-2 border-[#c5a059] p-1.5 bg-white shadow-sm overflow-hidden">
              <img
                src={imageUrl}
                className="h-full w-full object-contain"
                alt="thumbnail"
              />
            </button>
          </div>

          {/* Main Display Image */}
          {/* <div className="flex-1 relative rounded-2xl bg-white p-6 sm:p-0 border border-gray-100 shadow-lg flex items-center justify-center min-h-[380px] sm:min-h-[80px]">
            {product.bestseller && (
              <span className="absolute top-4 left-4 z-10 bg-[#c5a059] text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                ★ BESTSELLER
              </span>
            )}
            <img
              src={imageUrl}
              alt={product.title}
              className="max-h-[400px] max-w-full object-contain transition-transform duration-500 "
            />
          </div> */}

          <div className="flex-1 relative rounded-2xl bg-white border border-gray-100 shadow-lg flex items-center justify-center overflow-hidden">
            {product.bestseller && (
              <span className="absolute top-4 left-4 z-10 bg-[#c5a059] text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                ★ BESTSELLER
              </span>
            )}
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full max-h-[400px] object-contain transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Product Options & Details (6 cols on lg) */}
        <section className="lg:col-span-6 flex flex-col justify-between bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg">
          <div>
            {/* Category Pill */}
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full inline-block mb-3">
              {product.category || "Premium Phone Case"}
            </span>

            {/* Title */}
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-gray-900 mb-3 leading-snug">
              {product.title}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-4 text-amber-400 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-semibold">
                (4.9/5 from 182 reviews)
              </span>
            </div>

            {/* Price Header */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-gray-100">
              <span className="text-2xl sm:text-3xl font-black text-gray-900">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    % SAVINGS
                  </span>
                </>
              )}
            </div>

            {/* --- PHONE BRAND & MODEL SELECTOR OPTION --- */}
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-gray-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase text-gray-900 tracking-wider flex items-center gap-2">
                  <FiSmartphone className="text-[#c5a059]" />
                  <span>Select Phone Model *</span>
                </label>
                <span className="text-[10px] font-bold uppercase text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-0.5 rounded">
                  {selectedModel}
                </span>
              </div>

              {/* Brand Tabs */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleBrandChange("Apple")}
                  className={`flex-1 py-2 px-3 text-xs font-extrabold uppercase rounded-lg border transition ${
                    selectedBrand === "Apple"
                      ? "bg-black text-white border-black shadow"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                  }`}
                >
                   Apple iPhone
                </button>
                <button
                  type="button"
                  onClick={() => handleBrandChange("Samsung")}
                  className={`flex-1 py-2 px-3 text-xs font-extrabold uppercase rounded-lg border transition ${
                    selectedBrand === "Samsung"
                      ? "bg-black text-white border-black shadow"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  Samsung Galaxy
                </button>
              </div>

              {/* Model Select Dropdown */}
              <div>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-white border-2 border-gray-900 text-gray-900 text-xs sm:text-sm font-bold rounded-lg px-4 py-3 outline-none focus:border-[#c5a059] cursor-pointer shadow-sm transition"
                >
                  {selectedBrand === "Apple" ? (
                    <optgroup label="iPhone Models">
                      {IPHONE_MODELS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </optgroup>
                  ) : (
                    <optgroup label="Samsung Models">
                      {SAMSUNG_MODELS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-xs font-extrabold uppercase text-gray-500 tracking-widest mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center rounded-lg border-2 border-gray-900 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-100 font-extrabold text-sm transition"
                >
                  -
                </button>
                <span className="px-6 py-2 font-bold text-sm border-x-2 border-gray-900 min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 hover:bg-gray-100 font-extrabold text-sm transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal preview */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-6">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Total Price:
              </span>
              <span className="text-xl font-extrabold text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAddToCart(false)}
                disabled={addingToCart}
                className="flex-1 bg-white border-2 border-black py-4 px-6 rounded-lg text-xs font-extrabold uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <FiShoppingBag size={16} />
                <span>{addingToCart ? "Adding..." : "Add to Cart"}</span>
              </button>

              <button
                onClick={() => handleAddToCart(true)}
                disabled={addingToCart}
                className="flex-1 bg-[#c5a059] py-4 px-6 rounded-lg text-xs font-extrabold uppercase tracking-[0.2em] text-black hover:bg-[#d4af37] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <FiZap size={16} />
                <span>Buy It Now</span>
              </button>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-[10px] text-gray-600 uppercase font-semibold">
            <div className="flex flex-col items-center gap-1">
              <FiTruck className="text-[#c5a059] text-base" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FiShield className="text-[#c5a059] text-base" />
              <span>Lifetime Print</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FiRotateCcw className="text-[#c5a059] text-base" />
              <span>7 Days Return</span>
            </div>
          </div>
        </section>
      </main>

      {/* Tabs / Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-10">
          <div className="flex border-b border-gray-200 mb-6 gap-8 text-xs sm:text-sm font-extrabold uppercase tracking-widest">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 border-b-2 transition ${
                activeTab === "description"
                  ? "border-[#c5a059] text-[#c5a059]"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              Description & Craftsmanship
            </button>
          </div>

          {activeTab === "description" && (
            <div className="text-gray-600 text-xs sm:text-sm leading-relaxed space-y-4">
              <p>
                {product.description ||
                  "Designed with high-density polycarbonate materials combined with shock-absorbing TPU bumpers, this phone case delivers uncompromising protection while preserving your smartphone's slim profile."}
              </p>
              <ul className="list-disc list-inside space-y-2 font-medium text-gray-700 pt-2">
                <li>Military drop-test certified up to 10 feet.</li>
                <li>Raised camera bezel & front screen lip for 360° guard.</li>
                <li>Scratch-resistant UV matte coat finish that won't fade.</li>
                <li>
                  Fully compatible with wireless charging and MagSafe
                  accessories.
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
