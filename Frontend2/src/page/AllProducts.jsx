import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";

function AllProducts() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts();

        // getProducts returns the parsed API body directly, while older API
        // clients may wrap the body in `data`.
        const payload = response?.data ?? response;
        const allProducts = Array.isArray(payload)
          ? payload
          : payload?.products ?? payload?.data?.products ?? [];

        const categorySlug = decodeURIComponent(category)
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

        const filteredProducts = allProducts.filter((product) => {
          const productCategory =
            typeof product.category === "object"
              ? product.category?.slug || product.category?.name
              : product.category;

          const productSlug = String(productCategory || "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

          return productSlug === categorySlug;
        });

        setProducts(filteredProducts);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const title = decodeURIComponent(category)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-semibold text-gray-600 hover:text-black"
        >
          ← Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold uppercase text-gray-900 sm:text-3xl">
            {title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {products.length} products available
          </p>
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-500">
            Loading products...
          </p>
        ) : error ? (
          <p className="py-12 text-center text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AllProducts;
