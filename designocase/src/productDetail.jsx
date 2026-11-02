import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
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
import { getProductById } from "./api/productApi";
import Footer from "./component/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("features");

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
      <div className="flex min-h-screen items-center justify-center bg-[#f5f1ea] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f1ea] px-6 text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-500">{error || "Product not found"}</h2>
        <Link
          to="/"
          className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Back to Home
        </Link>
      </div>
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
    <main className="min-h-screen bg-[#f5f1ea]">
      {/* Top Product Section */}
      <div className="mx-auto flex min-h-[85vh] w-full flex-col bg-[#f8f4ef]">
     

        <div className="grid flex-1 items-center lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-[#efeae1] p-6 sm:p-8 lg:p-12">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[72vh] w-full max-w-[560px] object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.15)]"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
              {product.category || "Premium Case"}
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[3.1rem]">
              {product.title}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-black sm:text-4xl">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>

              {product.originalPrice != null && (
                <span className="text-lg text-neutral-500 line-through sm:text-xl">
                  ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600 sm:text-lg">
              {product.description ||
                "Designed for everyday protection and style, this premium case gives your device a sleek, refined look while keeping it safe from scratches, bumps, and everyday wear."}
            </p>

            <div className="mt-7 space-y-3 text-sm text-neutral-700 sm:text-base">
              <p>• Slim and lightweight build</p>
              <p>• Shock-resistant protection</p>
              <p>• Precise fit with easy access to ports</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:max-w-md sm:flex-row">
              <button
                onClick={() => console.log("Add to cart:", product.title)}
                className="flex-1 cursor-pointer rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                Add to Cart
              </button>

              <button
                className="flex-1 cursor-pointer rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-100"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Product Details Container */}
      <section className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          {/* Section Header */}
          <div className="mb-8 border-b border-neutral-200 pb-6 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                Product Information
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Product Details & Specifications
              </h2>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
              <button
                onClick={() => setActiveTab("features")}
                className={`cursor-pointer rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "features"
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                Features & Highlights
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`cursor-pointer rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "specs"
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`cursor-pointer rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "shipping"
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                Shipping & Returns
              </button>
            </div>
          </div>

          {/* Tab 1: Features & Highlights */}
          {activeTab === "features" && (
            <div className="space-y-8">
              <div className="max-w-3xl">
                <h3 className="text-lg font-bold text-neutral-900">Description</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-600 sm:text-base">
                  {product.description ||
                    "Engineered with premium polycarbonate and impact-damping TPU bumpers, this phone case delivers reliable 360-degree protection while keeping a modern, slim profile. The exterior is coated with a scratch-resistant UV matte seal that prevents yellowing and keeps the artwork vibrant."}
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-neutral-900">Key Features</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-5 transition hover:border-neutral-300"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="mt-3 font-semibold text-neutral-900">{feat.title}</h4>
                        <p className="mt-1 text-xs leading-5 text-neutral-600 sm:text-sm">
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
              <h3 className="mb-4 text-lg font-bold text-neutral-900">Technical Specifications</h3>
              <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-[#fbf9f6]">
                {specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 sm:text-sm">
                      {spec.label}
                    </span>
                    <span className="mt-1 text-sm font-medium text-neutral-900 sm:mt-0 sm:text-base">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Returns */}
          {activeTab === "shipping" && (
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                  <Truck className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-bold text-neutral-900">Free Fast Delivery</h4>
                <p className="mt-2 text-xs leading-5 text-neutral-600 sm:text-sm">
                  Dispatched within 24-48 hours. Delivered across India in 3 to 5 business days with
                  full live tracking.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-bold text-neutral-900">7-Day Easy Returns</h4>
                <p className="mt-2 text-xs leading-5 text-neutral-600 sm:text-sm">
                  Received wrong size or damaged case? No questions asked instant replacement or
                  refund within 7 days.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-[#fbf9f6] p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-bold text-neutral-900">100% Quality Assurance</h4>
                <p className="mt-2 text-xs leading-5 text-neutral-600 sm:text-sm">
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
