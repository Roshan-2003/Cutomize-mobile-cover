
import { useEffect, useState } from "react";
import { ShoppingBag, ArrowUp } from "lucide-react";
import { getProducts } from "../api/productApi";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    getProducts()
      .then((data) => {
        if (isCurrent) {
          setProducts(
            (data.products || []).filter((product) =>
              /^silicon(?:e)?(?:\s+cases?)?$/i.test(product.category?.trim() || "")
            )
          );
        }
      })
      .catch((fetchError) => {
        console.error("Failed to load bestseller products:", fetchError);
        if (isCurrent) {
          setError(fetchError.message || "Unable to load best sellers.");
        }
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const addToCart = (product) => {
    console.log("Added to cart:", product.title);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-grey-200 px-4 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        {/* Section heading */}
        <div className="mb-10">
          <h2 className="inline-flex rounded-full bg-black px-7 py-4 text-lg font-semibold text-white">
            Best Seller's
          </h2>
        </div>

        {/* Product grid */}
        {loading ? (
          <p role="status" className="py-10 text-center text-gray-500">
            Loading best sellers...
          </p>
        ) : error ? (
          <p role="alert" className="py-10 text-center text-red-600">
            {error}
          </p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No Silicon Cases products are available yet.
          </p>
        ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product._id} className="group min-w-0">
              {/* Product image */}
              <div className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-t-2xl  sm:h-[330px] lg:h-[390px]">
                <span className="absolute right-3 top-3 z-10 rounded-sm bg-emerald-500 px-2 py-1 text-[11px] font-bold text-white">
                  BUY 1 GET 2
                </span>

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Product details */}
<div className="rounded-b-2xl border border-white bg-white px-4 py-5 shadow-sm sm:px-5">
                <div className="flex min-h-[44px] items-start justify-between gap-3">
                  <h3 className="text-[15px] font-medium leading-5 text-black">
                    {product.title}
                  </h3>

                  <button
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.title} to cart`}
                    className="shrink-0 rounded-md p-1 text-black transition hover:bg-gray-200"
                  >
                    <ShoppingBag size={22} strokeWidth={1.8} />
                  </button>
                </div>

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-black">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </span>

                  {product.originalPrice != null && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Offer */}
                <p className="mt-1 text-[13px] text-black">
                  Get any 3 for ₹999{" "}
                  <span className="font-medium text-emerald-600">
                    (₹333 each)
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:-translate-y-1"
      >
        <ArrowUp size={21} />
      </button>
    </section>
  );
}
