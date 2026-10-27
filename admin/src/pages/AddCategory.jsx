import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../api/categoryApi";

import CategoryModal from "./AddCategoryModel";
import { Link } from "react-router-dom";

import {
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiImage,
  FiX,
} from "react-icons/fi";

function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const fetchCategories = async () => {
    setFetching(true);

    try {
      const response = await getCategories();

      const data =
        response?.categories ??
        response?.data?.categories ??
        response?.data ??
        response;

      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch categories error:", error);
      setMessage("Unable to load categories.");
      setMessageType("error");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Called by CategoryModal after submitting the form
  const handleCategoryAdded = async (formData) => {
    await createCategory(formData);

    setMessage("Category added successfully!");
    setMessageType("success");

    await fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this category?"
      )
    ) {
      return;
    }

    setDeletingId(id);
    setMessage("");

    try {
      await deleteCategory(id);

      setCategories((prev) =>
        prev.filter((category) => category._id !== id)
      );

      setMessage("Category deleted successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Delete category error:", error);

      setMessage(
        error.response?.data?.message ||
          "Unable to delete category."
      );
      setMessageType("error");
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryImage = (category) => {
    if (category.image) return category.image;

    if (
      Array.isArray(category.images) &&
      category.images.length > 0
    ) {
      const firstImage = category.images[0];

      return typeof firstImage === "string"
        ? firstImage
        : firstImage?.url || "";
    }

    return "";
  };

  return (
    <div className="min-h-screen bg-slate-50 ">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
        
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white hover:bg-slate-800"
          >
            <FiPlus size={19} />
            Add Category
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`flex items-center justify-between rounded-xl p-4 text-sm font-medium ${
              messageType === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message}
            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Close message"
            >
              <FiX size={18} />
            </button>
          </div>
        )}

        {/* Categories Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-bold text-slate-900">
                All Categories
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Total: {categories.length} categories
              </p>
            </div>

            <button
              type="button"
              onClick={fetchCategories}
              disabled={fetching}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
            >
              <FiRefreshCw
                className={fetching ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Slug</th>
                  <th className="px-5 py-4 text-center">Best Product</th>
                  <th className="px-5 py-4">Description</th>
                  <th className="px-5 py-4 text-center">Products / Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {fetching ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      Loading categories...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <FiImage
                        size={30}
                        className="mx-auto mb-2 text-slate-300"
                      />
                      <p className="font-medium text-slate-700">
                        No categories found
                      </p>
                    </td>
                  </tr>
                ) : (
                  categories.map((category, index) => (
                    <tr
                      key={category._id || category.slug || index}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4">
                        {getCategoryImage(category) ? (
                          <img
                            src={getCategoryImage(category)}
                            alt={category.name}
                            className="h-14 w-14 rounded-xl border object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                            <FiImage size={22} />
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {category.name}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {category.slug}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            category.bestProduct
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {category.bestProduct ? "Yes" : "No"}
                        </span>
                      </td>

                      <td className="max-w-xs px-5 py-4 text-sm text-slate-500">
                        <p className="line-clamp-2">
                          {category.description || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/products?category=${encodeURIComponent(category.slug)}`}
                          className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                        >
                          View Products
                        </Link>
                        <Link
                          to={`/add-product?category=${encodeURIComponent(category.slug)}`}
                          className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-600"
                        >
                          Add Product
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteCategory(category._id)
                          }
                          disabled={
                            deletingId === category._id ||
                            !category._id
                          }
                          title="Delete category"
                          className="inline-flex items-center justify-center rounded-lg  p-2.5 text-red-600 hover:bg-red-100 disabled:opacity-50"
                        >
                          {deletingId === category._id ? (
                            <FiRefreshCw
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
  <img
    src="/delete.png"
    alt="Delete"
    className="w-4 h-4 object-contain brightness-0 saturate-100"
    style={{
      filter:
        "invert(18%) sepia(94%) saturate(6000%) hue-rotate(350deg) brightness(95%) contrast(110%)",
    }}
  />                          )}
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Separate Modal Component */}
      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          onCategoryAdded={handleCategoryAdded}
        />
      )}
    </div>
  );
}

export default AddCategory;
