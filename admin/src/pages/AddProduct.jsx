import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createProduct } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { getProductCategoryOptions } from "../data/productCategories";
import { FiUploadCloud, FiCheckCircle, FiPackage } from "react-icons/fi";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    originalPrice: "",
    discount: "",
    image: null,
    category: "",
    color: "",
    material: "",
    description: "",
    bestseller: false,
  });

  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let isCurrent = true;

    getCategories()
      .then((data) => {
        if (isCurrent) {
          const loadedCategories = data.categories || [];
          setCategories(loadedCategories);
          const requestedCategory = searchParams.get("category");
          const selectedCategory = loadedCategories.find(
            (category) => category.slug === requestedCategory || category._id === requestedCategory
          );
          if (selectedCategory) {
            setForm((prev) => ({ ...prev, category: selectedCategory.name }));
            setIsCustomCategory(false);
          }
        }
      })
      .catch((error) => {
        console.error("Failed to load categories:", error);
        if (isCurrent) {
          setCategoryError(
            error.response?.data?.message ||
              error.message ||
              "Custom categories could not be loaded."
          );
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      image: file,
    });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.image) {
      alert("Please enter title, price, and select an image.");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("originalPrice", form.originalPrice);
      formData.append("discount", form.discount);
      formData.append("image", form.image);
      formData.append("category", form.category);
      formData.append("color", form.color);
      formData.append("material", form.material);
      formData.append("description", form.description);
      formData.append("bestseller", form.bestseller);

      const data = await createProduct(formData);
      alert("Product added successfully!");

      // Reset form
      setForm({
        title: "",
        price: "",
        originalPrice: "",
        discount: "",
        image: null,
        category: "",
        color: "",
        material: "",
        description: "",
        bestseller: false,
      });
      setIsCustomCategory(false);
      setPreview("");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Product Information (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100">
            Basic Information
          </h2>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Product Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Trackline Edition Tough Case"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition"
            />
          </div>

          {/* Price, Original Price, Discount Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Selling Price (₹) *
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="1499"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Original MRP (₹)
              </label>
              <input
                name="originalPrice"
                type="number"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="1999"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Discount Tag
              </label>
              <input
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="e.g. 25% OFF"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition"
              />
            </div>
          </div>

          {/* Category, Color, Material Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={isCustomCategory ? "__custom__" : form.category}
                onChange={(e) => {
                  if (e.target.value === "__custom__") {
                    setIsCustomCategory(true);
                    setForm((prev) => ({ ...prev, category: "" }));
                  } else {
                    setIsCustomCategory(false);
                    setForm((prev) => ({ ...prev, category: e.target.value }));
                  }
                }}
                required={!isCustomCategory}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition bg-white"
              >
                <option value="">Select Category</option>
                {getProductCategoryOptions(categories).map((categoryName) => (
                  <option key={categoryName} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
                <option value="__custom__">+ Enter Custom Category Name...</option>
              </select>

              {isCustomCategory && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    required
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCategory(false);
                      setForm((prev) => ({ ...prev, category: "" }));
                    }}
                    className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {categoryError && (
                <p role="status" className="mt-2 text-xs text-amber-700">
                  Custom categories could not be loaded ({categoryError}). The built-in categories are still available.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Color
              </label>
              <input
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="e.g. Matte Black"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Material
              </label>
              <input
                name="material"
                value={form.material}
                onChange={handleChange}
                placeholder="e.g. Polycarbonate Dual Layer"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Description & Specifications
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description, drop-protection details, compatibility..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition"
            />
          </div>
        </div>

        {/* Right Column - Media Upload & Options (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Image Upload Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100">
              Product Image *
            </h2>

            <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-black transition-colors bg-slate-50/50">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required={!form.image}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                <FiUploadCloud size={32} className="text-black" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Upload Product Image
                </span>
                <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</span>
              </div>
            </div>

            {/* Preview Display */}
            {preview && (
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-16 h-20 object-contain rounded-lg border bg-white"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Image Selected</span>
                  <span className="text-[10px] text-gray-700 font-semibold flex items-center gap-1">
                    <FiCheckCircle /> Ready for upload
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bestseller Option */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="bestseller"
                checked={form.bestseller}
                onChange={handleChange}
                className="accent-black h-5 w-5 rounded"
              />
              <div>
                <span className="text-xs font-bold uppercase text-slate-800 block">
                  Mark as Bestseller ★
                </span>
                <span className="text-[10px] text-slate-400">
                  Displays gold bestseller badge on home page
                </span>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white py-4 rounded-xl text-xs font-extrabold uppercase tracking-[0.25em] hover:bg-gray-800 transition-all duration-300 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Publishing Product..." : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
