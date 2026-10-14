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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await getProducts();
        const iphoneResponse = await getIphone17Products();

        setProducts(productResponse.products || []);
        setIphone17Series(iphoneResponse.products || []);
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

const categoryViews = {
  tough: {
    title: "Premium Tough Cases",
    products: products.filter(
      (product) => product.category === "Premium Tough Cases"
    ),
  },
  leather: {
    title: "Premium Leather Cases",
    products: products.filter(
      (product) => product.category === "Leather Cases"
    ),
  },
  chaos: {
    title: "CHAOS – Our Newest Drops",
    products: products.filter(
      (product) => product.category === "CHAOS Drops"
    ),
  },
  iphone17: {
    title: "New iPhone 17 Series",
    products: iphone17Series,
  },
  glass: {
    title: "Glass Cases",
    products: products.filter(
      (product) => product.category === "Glass Cases"
    ),
  },
  stride: {
    title: "Stride Cases",
    products: products.filter(
      (product) => product.category === "Stride Cases"
    ),
  },
  silicon: {
    title: "Silicon Cases",
    products: products.filter(
      (product) => product.category === "Silicon Cases"
    ),
  },
  wallet: {
    title: "Card Wallet",
    products: products.filter(
      (product) => product.category === "Card Wallet"
    ),
  },
  "pop-slider": {
    title: "Pop Slider",
    products: products.filter(
      (product) => product.category === "Pop Slider"
    ),
  },
  printed: {
    title: "Printed Cases",
    products: products.filter(
      (product) => product.category === "Printed Cases"
    ),
  },
};

const selectedCategory = categoryViews[searchParams.get("cat")];

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
                  <ProductSection
                    title={selectedCategory.title}
                    products={selectedCategory.products}
                  />
                ) : (
                  <>
                <Hero />
                <CategorySection />
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
