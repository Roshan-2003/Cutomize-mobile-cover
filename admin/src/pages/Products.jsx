import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiEdit, FiTrash2, FiSearch, FiX, FiCheck, FiFilter } from "react-icons/fi";
import { API_BASE_URL, API_ORIGIN } from "../api/apiUrl";
import { getCategories } from "../api/categoryApi";
import { getProductCategoryOptions } from "../data/productCategories";

const API_URL = `${API_BASE_URL}/products`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [searchParams] = useSearchParams();

  const categoryOptions = getProductCategoryOptions(
    categories,
    editProduct?.category
  );

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setProductsError("");
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Unable to load products (HTTP ${response.status}).`);
      }
      setProducts(data.products || []);
    } catch (error) {
      console.log("Get Products Error:", error);
      setProductsError(error.message || "Unable to load products. Check the backend API URL and connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    getCategories()
      .then((data) => {
        const loadedCategories = data.categories || [];
        setCategories(loadedCategories);
        const requestedSlug = searchParams.get("category");
        const requestedCategory = loadedCategories.find((category) => category.slug === requestedSlug);
        if (requestedCategory) setSelectedCategory(requestedCategory.name);
      })
      .catch((error) => {
        console.error("Failed to load categories:", error);
        setCategoryError(
          error.response?.data?.message ||
            error.message ||
            "Custom categories could not be loaded."
        );
      });
  }, [searchParams]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.log("Delete Error:", error);
      alert(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${editProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editProduct.title,
          price: editProduct.price,
          originalPrice: editProduct.originalPrice,
          discount: editProduct.discount,
          category: editProduct.category,
          color: editProduct.color,
          material: editProduct.material,
          description: editProduct.description,
          bestseller: editProduct.bestseller,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Product updated successfully");
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.log("Update Error:", error);
      alert(error.message);
    }
  };

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Browse products by category.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
            <option value="">All categories</option>
            {getProductCategoryOptions(categories).map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
          {selectedCategory && (
            <Link to={`/add-product?category=${encodeURIComponent(categories.find((category) => category.name === selectedCategory)?.slug || selectedCategory)}`} className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Add product to {selectedCategory}
            </Link>
          )}
        </div>
      </div>

      {productsError && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {productsError}
        </p>
      )}

      {categoryError && (
        <p role="status" className="text-xs text-amber-700">
          Custom categories could not be loaded ({categoryError}). The built-in categories are still available.
        </p>
      )}

      {/* Edit Modal Overlay */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                Edit Product Details
              </h2>
              <button
                onClick={() => setEditProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editProduct.title || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded-lg px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={editProduct.price || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded-lg px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={editProduct.originalPrice || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded-lg px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={editProduct.category || ""}
                    onChange={handleEditChange}
                    className="w-full border rounded-lg px-3 py-2 text-xs outline-none focus:border-black"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((categoryName) => (
                      <option key={categoryName} value={categoryName}>
                        {categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={editProduct.description || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2 text-xs outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  name="bestseller"
                  id="bestseller"
                  checked={editProduct.bestseller || false}
                  onChange={handleEditChange}
                  className="accent-black h-4 w-4"
                />
                <label htmlFor="bestseller" className="text-xs font-bold uppercase text-slate-700 cursor-pointer">
                  Feature as Bestseller
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            Loading products list...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs font-medium text-slate-500">
            No products found matching your filter criteria.
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <th className="p-4">Product Details</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Bestseller</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-12 h-14 bg-slate-50 border border-slate-200 rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={
                            product.image
                              ? product.image.startsWith("http")
                                ? product.image
                                : `${API_ORIGIN}${product.image}`
                              : ""
                          }
                          alt={product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="font-bold text-slate-900 leading-snug line-clamp-2 max-w-xs">
                        {product.title}
                      </span>
                    </td>

                    <td className="p-4 font-bold text-slate-900">
                      ₹{product.price}
                      {product.originalPrice && (
                        <span className="block text-[10px] font-normal text-slate-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {product.category || "Uncategorized"}
                      </span>
                    </td>

                    <td className="p-4">
                      {product.bestseller ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-800">
                          ★ YES
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] font-bold">No</span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2  rounded-lg transition-colors text-blue-600 cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit size={18} />
                        </button>
                      <button
  onClick={() => handleDelete(product._id)}
  className="p-2 rounded-lg transition-colors cursor-pointer"
  title="Delete"
>
  <img
    src="/delete.png"
    alt="Delete"
    className="w-4 h-4 object-contain brightness-0 saturate-100"
    style={{
      filter:
        "invert(18%) sepia(94%) saturate(6000%) hue-rotate(350deg) brightness(95%) contrast(110%)",
    }}
  />
</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
