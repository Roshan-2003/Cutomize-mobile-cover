
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {products.map((product) => (
            <article key={product._id} className="group min-w-0">
              {/* Product image */}
              <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-t-2xl sm:h-[300px] lg:h-[390px]">
                <span className="absolute right-2 top-2 z-10 rounded-sm bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white sm:right-3 sm:top-3 sm:px-2 sm:py-1 sm:text-[11px]">
                  BUY 1 GET 2
                </span>

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-105 sm:p-4"
                  loading="lazy"
                />
              </div>

              {/* Product details */}
              <div className="rounded-b-2xl border border-white bg-white p-3 shadow-sm sm:px-5 sm:py-5">
                <div className="flex min-h-[40px] items-start justify-between gap-2 sm:min-h-[44px] sm:gap-3">
                  <h3 className="text-[13px] font-medium leading-4 text-black line-clamp-2 sm:text-[15px] sm:leading-5">
                    {product.title}
                  </h3>

                  <button
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.title} to cart`}
                    className="shrink-0 rounded-md p-1 text-black transition hover:bg-gray-200"
                  >
                    <ShoppingBag className="h-4 w-4 sm:h-[22px] sm:w-[22px]" strokeWidth={1.8} />
                  </button>
                </div>

                {/* Price */}
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 sm:mt-2 sm:gap-2">
                  <span className="text-xs font-semibold text-black sm:text-[15px]">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </span>

                  {product.originalPrice != null && (
                    <span className="text-[11px] text-gray-500 line-through sm:text-sm">
                      ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Offer */}
                <p className="mt-1 text-[11px] text-black sm:text-[13px]">
                  Get any 3 for ₹999{" "}
                  <span className="font-medium text-emerald-600 block sm:inline">
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
