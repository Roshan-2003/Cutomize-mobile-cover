import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import OrderSuccess from "./page/OrderSuccess";
import Orders from "./page/Orders";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import ProductSection from "./components/ProductSection";
import CategoryGrid from "./components/CategoryGrid";
import TrustBar from "./components/TrustBar";
import NewsletterGallery from "./components/NewsletterGallery";
import Footer from "./components/Footer";

import { getProducts, getIphone17Products } from "./api/productApi";
import { getCategories } from "./api/categoryApi";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./page/Checkout";

// ScrollToTop component to reset window scroll position on page change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

function App() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [iphone17Series, setIphone17Series] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await getProducts();
        const iphoneResponse = await getIphone17Products();
        const categoryResponse = await getCategories();

        setProducts(productResponse.products || []);
        setIphone17Series(iphoneResponse.products || []);
        setCategories(categoryResponse.categories || []);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0a0a0a] text-white">
  //       <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
  //       <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059]">
  //         Loading Singh & Chand...
  //       </p>
  //     </div>
  //   );
  // }

  const premiumToughCases = products.filter(
    (product) => product.category === "Premium Tough Cases"
  );

  const leatherCases = products.filter(
    (product) => product.category === "Leather Cases"
  );

  const ChaosDrop = products.filter(
    (product) => product.category === "CHAOS Drops"
  );

  const normalizeCategory = (val) =>
    val ? val.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "") : "";

  const matchesCategory = (productCat, catName, catSlug) => {
    if (!productCat) return false;
    const p = normalizeCategory(productCat);
    const n = normalizeCategory(catName);
    const s = normalizeCategory(catSlug);
    return (
      p === n ||
      p === s ||
      (catName &&
        productCat.toString().trim().toLowerCase() ===
          catName.toString().trim().toLowerCase())
    );
  };

  const PRESET_MAP = {
    glass: "Glass Cases",
    stride: "Stride Cases",
    silicon: "Silicon Cases",
    wallet: "Card Wallet",
    "pop-slider": "Pop Slider",
    printed: "Printed Cases",
    tough: "Premium Tough Cases",
    leather: "Leather Cases",
    chaos: "CHAOS Drops",
  };

  const categorySlug = searchParams.get("cat");

  let selectedCategory = null;

  if (categorySlug) {
    if (categorySlug === "iphone17") {
      selectedCategory = {
        title: "New iPhone 17 Series",
        products: iphone17Series,
      };
    } else {
      const dynamicCategory = categories.find(
        (category) =>
          category.slug === categorySlug ||
          normalizeCategory(category.name) === normalizeCategory(categorySlug)
      );

      const title =
        dynamicCategory?.name || PRESET_MAP[categorySlug] || categorySlug;

      selectedCategory = {
        title,
        products: products.filter((product) =>
          matchesCategory(product.category, title, categorySlug)
        ),
      };
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <CartProvider>
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />

        {/* <AnnouncementBar /> */}

        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {selectedCategory ? (
                  <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-4">
                      <a
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black transition"
                      >
                        ← Back to All Products
                      </a>
                    </div>
                    <ProductSection
                      title={selectedCategory.title}
                      products={selectedCategory.products}
                    />
                  </div>
                ) : (
                  <>
                <Hero />
                <CategorySection categories={categories} />
                <ProductSection
                  id="products-section"
                  title="Premium Tough Cases"
                  // subtitle="Military-Grade Dual Layer Protection"
                  products={premiumToughCases}
                  showViewAll={true}
                />
                <div className=" py-6 sm:pt-10">
                  <ProductSection
                    title="New iPhone 17 Series"
                    // subtitle="Designed For The Next Generation"
                    products={iphone17Series}
                  />
                </div>
                <div className="space-y-12 sm:space-y-20">
                  <CategoryGrid />
                  <ProductSection
                    title="Premium Leather Cases"
                    // subtitle="Handcrafted Elegance"
                    products={leatherCases}
                    showViewAll={true}
                  />

                  <ProductSection
                    title="CHAOS – Our Newest Drops"
                    // subtitle="Bespoke Art & Trendsetter Covers"
                    products={ChaosDrop}
                    showViewAll={true}
                  />
                  <TrustBar />

                  <NewsletterGallery />
                </div>
                  </>
                )}
              </>
            }
          />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
