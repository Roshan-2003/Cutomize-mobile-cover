import { useEffect, useState } from "react";
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
} from "lucide-react";

import AnnouncementBar from "./component/AnnouncementBar";
import Navbar from "./component/Navbar";
import SearchPanel from "./component/SearchPanel";
import NavigationDrawer from "./component/NavigationDrawer";
import CartDrawer from "./component/CartDrawer";
import Footer from "./component/Footer";
import { getProductById } from "./api/productApi";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("features");

  // Navbar & Drawer states
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

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
        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
        <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <NavigationDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        <div className="flex min-h-[50vh] sm:min-h-[60vh] items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="mx-auto mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-black border-t-transparent" />
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              Loading product details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-white text-neutral-900">
        <AnnouncementBar />
        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
        <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <NavigationDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

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
    { label: "Brand Compatibility", value: product.brand || "Apple iPhone / Samsung Galaxy" },
    { label: "Material", value: product.material || "High-Grade Polycarbonate + Shockproof TPU" },
    {
      label: "Finish",
      value: product.color ? `${product.color} (Matte UV Finish)` : "Anti-Scratch Matte Finish",
    },
    { label: "Form Factor", value: "Slim Protective Snap Case" },
    { label: "In The Box", value: "1x Premium Case, 1x Authenticity Card" },
    { label: "Warranty", value: "Lifetime Print Fade Warranty" },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Same AnnouncementBar as Home Page */}
      <AnnouncementBar />

      {/* Same Navbar as Home Page with full state props */}
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />

      {/* Drawers */}
      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NavigationDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Breadcrumb Navigation - Responsive margin & padding */}
    

      {/* Top Product Section - Responsive layout for Mobile, Tablet, Laptop */}
      <div className="mx-auto w-full max-w-[1500px] px-3 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8 lg:pb-12">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f8f4ef] lg:grid-cols-2">
          {/* Product Image Container */}
          <div className="flex items-center justify-center bg-[#efeae1] p-5 sm:p-7 md:p-9 lg:p-12 xl:p-16">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[300px] sm:max-h-[380px] md:max-h-[460px] lg:max-h-[64vh] xl:max-h-[70vh] w-full max-w-[520px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] sm:drop-shadow-[0_30px_35px_rgba(0,0,0,0.15)]"
            />
          </div>

          {/* Product Info Container */}
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

            <p className="mt-3.5 sm:mt-5 md:mt-6 max-w-xl text-xs sm:text-sm md:text-base lg:text-base leading-6 sm:leading-7 text-neutral-600">
              {product.description ||
                "Designed for everyday protection and style, this premium case gives your device a sleek, refined look while keeping it safe from scratches, bumps, and everyday wear."}
            </p>

            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5 text-xs sm:text-sm md:text-sm text-neutral-700">
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

            <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col gap-2.5 sm:gap-3 sm:max-w-md sm:flex-row">
              <button
                onClick={() => {
                  console.log("Add to cart:", product.title);
                  setCartOpen(true);
                }}
                className="flex-1 cursor-pointer rounded-full bg-black py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800 active:scale-[0.99]"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  console.log("Buy now:", product.title);
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

      {/* Bottom Product Details Container - Fully responsive */}
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
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">Description</h3>
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
                  Dispatched within 24-48 hours. Delivered across India in 3 to 5 business days with
                  full live tracking.
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
                  Received wrong size or damaged case? No questions asked instant replacement or
                  refund within 7 days.
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-4 sm:p-6 text-center">
                <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-black text-white">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h4 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold text-neutral-900">
                  100% Quality Assurance
                </h4>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-neutral-600">
                  High-definition UV printing that never fades or peels off under normal daily usage.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
