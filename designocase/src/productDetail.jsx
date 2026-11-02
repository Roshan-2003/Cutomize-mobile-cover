import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "./api/productApi";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Could not load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 px-6 text-center">
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

  return (
    <main className="min-h-screen bg-[#f5f1ea]  ">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1500px] flex-col overflow-hidden  bg-[#f8f4ef] shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
      

        <div className="grid flex-1 lg:grid-cols-2">
          <div className="flex items-center justify-center bg-[#efeae1] p-6 sm:p-8 lg:p-12">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[70vh] w-full max-w-[520px] object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.15)]"
            />
          </div>

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
                className="flex-1 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                Add to Cart
              </button>

              <button
                className="flex-1 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-100"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
