import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  Feather,
  Eye,
  Truck,
  RotateCcw,
  CheckCircle2,
  Smartphone,
  ChevronDown,
  Check,
} from "lucide-react";

import AnnouncementBar from "./component/AnnouncementBar";
import Navbar from "./component/Navbar";
import SearchPanel from "./component/SearchPanel";
import NavigationDrawer from "./component/NavigationDrawer";
import CartDrawer from "./component/CartDrawer";
import Footer from "./component/Footer";
import { getProductById } from "./api/productApi";
import { addProductToCart } from "./utils/cartStorage";

const IPHONE_MODELS = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 17 Air",
  "iPhone 17",
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
  "iPhone 14 Plus",
  "iPhone 14",
  "iPhone 13 Pro Max",
  "iPhone 13 Pro",
  "iPhone 13",
  "iPhone 12 Pro Max",
  "iPhone 12 Pro",
  "iPhone 12",
  "iPhone 11",
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
  "Samsung Galaxy S22 Ultra",
  "Samsung Galaxy S22+",
  "Samsung Galaxy S22",
  "Samsung Galaxy Z Fold 6",
  "Samsung Galaxy Z Flip 6",
  "Samsung Galaxy Z Fold 5",
  "Samsung Galaxy Z Flip 5",
  "Samsung Galaxy A55 5G",
  "Samsung Galaxy A35 5G",
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("features");

  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 16 Pro Max");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const shouldBlurContent = menuOpen || searchOpen || cartOpen;

  const currentModels =
    selectedBrand === "Apple" ? IPHONE_MODELS : SAMSUNG_MODELS;

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(
      brand === "Apple" ? "iPhone 16 Pro Max" : "Samsung Galaxy S25 Ultra",
    );
    setModelDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setModelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError("Could not load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-neutral-900">
        <AnnouncementBar />

        <div
          className={
            shouldBlurContent
              ? "blur-[1.6px] brightness-90 transition-all duration-200"
              : "transition-all duration-200"
          }
        >
          <Navbar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
          />

          <div className="flex min-h-[50vh] sm:min-h-[60vh] items-center justify-center px-4 py-12">
            <div className="text-center">
              <div className="mx-auto mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-black border-t-transparent" />
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
                Loading product details...
              </p>
            </div>
          </div>
        </div>

        <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <NavigationDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-white text-neutral-900">
        <AnnouncementBar />

        <div
          className={
            shouldBlurContent
              ? "blur-[1.6px] brightness-90 transition-all duration-200"
              : "transition-all duration-200"
          }
        >
          <Navbar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
          />

          <div className="flex min-h-[50vh] sm:min-h-[60vh] flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
            <h2 className="mb-4 text-xl sm:text-2xl font-bold text-red-500">
              {error || "Product not found"}
            </h2>
            <Link
              to="/"
              className="rounded-full bg-black px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <NavigationDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </main>
    );
  }

  const features = [
    {
      icon: ShieldCheck,
      title: "Drop & Shock Protection",
      desc: "Engineered with reinforced TPU bumper corners to absorb impacts from accidental drops.",
    },
    {
      icon: Eye,
      title: "Raised Screen & Camera Lip",
      desc: "1.5mm raised bezels protect your camera lens and front screen from surface contact.",
    },
    {
      icon: Zap,
      title: "Wireless Charging Compatible",
      desc: "Designed to work effortlessly with standard Qi wireless chargers and magnetic mounts.",
    },
    {
      icon: Sparkles,
      title: "Scratch-Resistant UV Print",
      desc: "High-definition matte coating prevents peeling, discoloration, and everyday scratches.",
    },
    {
      icon: Feather,
      title: "Ultra Slim Profile",
      desc: "Sleek and featherlight build that slides easily into pockets without adding bulk.",
    },
    {
      icon: Layers,
      title: "Precision Tactile Cutouts",
      desc: "Exact cutouts ensure seamless access to all ports, speakers, mic, and responsive buttons.",
    },
  ];

  const specs = [
    { label: "Product Name", value: product.title },
    { label: "Category", value: product.category || "Designer Phone Case" },
    {
      label: "Selected Device",
      value: `${selectedBrand === "Apple" ? "Apple iPhone" : "Samsung Galaxy"} · ${selectedModel}`,
    },
    {
      label: "Material",
      value: product.material || "High-Grade Polycarbonate + Shockproof TPU",
    },
    {
      label: "Finish",
      value: product.color
        ? `${product.color} (Matte UV Finish)`
        : "Anti-Scratch Matte Finish",
    },
    { label: "Form Factor", value: "Slim Protective Snap Case" },
    { label: "In The Box", value: "1x Premium Case, 1x Authenticity Card" },
    { label: "Warranty", value: "Lifetime Print Fade Warranty" },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <AnnouncementBar />

      <div
        className={
          shouldBlurContent ? "blur-[1.6px] brightness-90 transition-all duration-200" : "transition-all duration-200"
        }
      >
        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />

        <div className="mx-auto w-full max-w-[1500px] px-3 sm:px-6 md:px-8 lg:px-12 ">
          <div className="relative grid items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14 rounded-2xl sm:rounded-3xl bg-[#f8f4ef] lg:grid-cols-2">
            <div className="flex items-center justify-center rounded-2xl ">
              <img
                src={product.image}
                alt={product.title}
                className=" object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] sm:drop-shadow-[0_30px_35px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div className="flex flex-col justify-center px-4 pb-6 sm:px-7 sm:pb-8 md:px-8 lg:p-8 lg:pr-10 xl:p-12">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-emerald-600">
                {product.category || "Premium Case"}
              </p>

              <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3rem] font-bold tracking-tight text-black leading-tight">
                {product.title}
              </h1>

              <div className="mt-3.5 sm:mt-5 flex items-center gap-2.5 sm:gap-3">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>

                {product.originalPrice != null && (
                  <span className="text-base sm:text-lg md:text-xl text-neutral-400 line-through">
                    ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div className="relative z-30 mt-4 sm:mt-5 rounded-2xl border border-neutral-200/90 bg-white/80 p-3.5 sm:p-4.5 backdrop-blur-sm shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4 text-emerald-600" />
                  <span>Select Phone Model *</span>
                </label>
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold">
                  {selectedModel}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleBrandChange("Apple")}
                  className={`flex-1 cursor-pointer rounded-xl py-2 px-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedBrand === "Apple"
                      ? "bg-black text-white shadow-sm"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                   Apple iPhone
                </button>
                <button
                  type="button"
                  onClick={() => handleBrandChange("Samsung")}
                  className={`flex-1 cursor-pointer rounded-xl py-2 px-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedBrand === "Samsung"
                      ? "bg-black text-white shadow-sm"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  Samsung Galaxy
                </button>
              </div>

              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setModelDropdownOpen((prev) => !prev)}
                  className="w-full cursor-pointer flex items-center justify-between rounded-xl border-2 border-neutral-900 bg-white py-2.5 pl-3.5 pr-3 text-xs sm:text-sm font-bold text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:ring-2 focus:ring-emerald-600"
                  aria-expanded={modelDropdownOpen}
                >
                  <span className="truncate">{selectedModel}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-700 transition-transform duration-200 shrink-0 ml-2 ${
                      modelDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {modelDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
                    <div className="bg-neutral-50 px-3.5 py-2 border-b border-neutral-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        {selectedBrand === "Apple"
                          ? "Apple iPhone Models"
                          : "Samsung Galaxy Models"}
                      </span>
                      <span className="text-[10px] font-medium text-neutral-400">
                        {currentModels.length} models
                      </span>
                    </div>

                    <ul className="max-h-60 sm:max-h-72 overflow-y-auto divide-y divide-neutral-100">
                      {currentModels.map((m) => {
                        const isSelected = m === selectedModel;
                        return (
                          <li key={m}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedModel(m);
                                setModelDropdownOpen(false);
                              }}
                              className={`w-full cursor-pointer flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm text-left transition ${
                                isSelected
                                  ? "bg-black text-white font-bold"
                                  : "text-neutral-700 hover:bg-neutral-100 hover:text-black font-medium"
                              }`}
                            >
                              <span>{m}</span>
                              {isSelected && (
                                <Check className="h-4 w-4 text-white shrink-0" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-3.5 sm:mt-5 max-w-xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-neutral-600">
              {product.description ||
                "Designed for everyday protection and style, this premium case gives your device a sleek, refined look while keeping it safe from scratches, bumps, and everyday wear."}
            </p>

            <div className="mt-4 sm:mt-5 space-y-2 text-xs sm:text-sm text-neutral-700">
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 shrink-0" />
                Slim and lightweight build
              </p>
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 shrink-0" />
                Shock-resistant protection
              </p>
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 shrink-0" />
                Precise fit with easy access to ports
              </p>
            </div>

            <div className="mt-6 sm:mt-7 flex flex-col gap-2.5 sm:gap-3 sm:max-w-md sm:flex-row">
              <button
                onClick={() => {
                  addProductToCart(product, {
                    selectedModel,
                    quantity: 1,
                  });
                }}
                className="flex-1 cursor-pointer rounded-full bg-black py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800 active:scale-[0.99]"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addProductToCart(product, {
                    selectedModel,
                    quantity: 1,
                  });
                  setCartOpen(true);
                }}
                className="flex-1 cursor-pointer rounded-full border border-neutral-300 bg-white py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-neutral-100 active:scale-[0.99]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      </div>

      <section className="mx-auto w-full max-w-[1500px] px-3 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-14 lg:py-16">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-7 md:p-9 lg:p-12 shadow-sm">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8 border-b border-neutral-200 pb-4 sm:pb-6 flex flex-col gap-3.5 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500">
                Product Information
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
                Product Details & Specifications
              </h2>
            </div>

            {/* Tabs - Scrollable on small screens, flex-wrap on tablet/laptop */}
            <div className="flex gap-2 overflow-x-auto pb-1.5 sm:pb-0 sm:flex-wrap">
              <button
                onClick={() => setActiveTab("features")}
                className={`shrink-0 cursor-pointer rounded-full px-3.5 sm:px-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "features"
                    ? "bg-black text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                Features & Highlights
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`shrink-0 cursor-pointer rounded-full px-3.5 sm:px-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "specs"
                    ? "bg-black text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`shrink-0 cursor-pointer rounded-full px-3.5 sm:px-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "shipping"
                    ? "bg-black text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                Shipping & Returns
              </button>
            </div>
          </div>

          {/* Tab 1: Features & Highlights */}
          {activeTab === "features" && (
            <div className="space-y-6 sm:space-y-8">
              <div className="max-w-3xl">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                  Description
                </h3>
                <p className="mt-2 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-neutral-600">
                  {product.description ||
                    "Engineered with premium polycarbonate and impact-damping TPU bumpers, this phone case delivers reliable 360-degree protection while keeping a modern, slim profile. The exterior is coated with a scratch-resistant UV matte seal that prevents yellowing and keeps the artwork vibrant."}
                </p>
              </div>

              <div>
                <h3 className="mb-3.5 sm:mb-4 text-base sm:text-lg font-bold text-neutral-900">
                  Key Features
                </h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl sm:rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-4 sm:p-5 transition hover:border-neutral-300"
                      >
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-black text-white">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <h4 className="mt-3 text-xs sm:text-sm md:text-base font-semibold text-neutral-900">
                          {feat.title}
                        </h4>
                        <p className="mt-1 text-[11px] sm:text-xs md:text-sm leading-5 text-neutral-600">
                          {feat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Specifications */}
          {activeTab === "specs" && (
            <div className="max-w-4xl">
              <h3 className="mb-3.5 sm:mb-4 text-base sm:text-lg font-bold text-neutral-900">
                Technical Specifications
              </h3>
              <div className="divide-y divide-neutral-200 rounded-xl sm:rounded-2xl border border-neutral-200 bg-[#fbf9f6]">
                {specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-neutral-500">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-medium text-neutral-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Returns */}
          {activeTab === "shipping" && (
            <div className="grid gap-3.5 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-xl sm:rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-4 sm:p-6 text-center">
                <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-black text-white">
                  <Truck className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h4 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold text-neutral-900">
                  Free Fast Delivery
                </h4>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-neutral-600">
                  Dispatched within 24-48 hours. Delivered across India in 3 to
                  5 business days with full live tracking.
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-4 sm:p-6 text-center">
                <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-black text-white">
                  <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h4 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold text-neutral-900">
                  7-Day Easy Returns
                </h4>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-neutral-600">
                  Received wrong size or damaged case? No questions asked
                  instant replacement or refund within 7 days.
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-4 sm:p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h4 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold text-neutral-900">
                  100% Quality Assurance
                </h4>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-neutral-600">
                  High-definition UV printing that never fades or peels off
                  under normal daily usage.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NavigationDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <Footer />
    </main>
  );
}
