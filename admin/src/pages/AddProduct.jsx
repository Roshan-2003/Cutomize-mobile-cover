import { useState } from "react";
import { createProduct } from "../api/productApi";
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
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase tracking-wider">
          Add New Phone Case
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Create a new product listing in your online store
        </p>
      </div>

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
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition"
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
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition"
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
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition"
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
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition"
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
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition bg-white"
              >
                <option value="">Select Category</option>
                <option value="Premium Tough Cases">Premium Tough Cases</option>
                <option value="Leather Cases">Leather Cases</option>
                <option value="CHAOS Drops">CHAOS – Our Newest Drops</option>
                <option value="New iPhone 17 Series">New iPhone 17 Series</option>
              </select>
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
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition"
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
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition"
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
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-600 transition"
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

            <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-indigo-500 transition-colors bg-slate-50/50">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required={!form.image}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                <FiUploadCloud size={32} className="text-indigo-600" />
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
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
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
                className="accent-indigo-600 h-5 w-5 rounded"
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
            className="w-full bg-slate-900 text-white py-4 rounded-xl text-xs font-extrabold uppercase tracking-[0.25em] hover:bg-indigo-600 transition-all duration-300 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Publishing Product..." : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
