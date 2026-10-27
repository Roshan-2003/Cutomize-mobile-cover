import { useState } from "react";
import { CATEGORY_PRESETS } from "../data/productCategories";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

function CategoryModal({ onClose, onCategoryAdded }) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    images: [],
    description: "",
    bestProduct: false,
  });

  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const generateSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const clearPreviews = () => {
    previews.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleClose = () => {
    if (loading) return;
    clearPreviews();
    onClose();
  };

  const handlePresetChange = (e) => {
    const preset = CATEGORY_PRESETS.find(
      (item) => item.name === e.target.value
    );

    if (!preset) return;

    clearPreviews();

    setForm((prev) => ({
      ...prev,
      name: preset.name,
      slug: preset.slug,
      images: [],
    }));

    setPreviews(preset.image ? [preset.image] : []);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name"
        ? { slug: generateSlug(value) }
        : {}),
    }));

    setMessage("");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(
          file.type
        ) && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      setMessage(
        "Only PNG, JPG and WEBP images up to 5MB each are allowed."
      );
      setError(true);
    } else {
      setMessage("");
    }

    if (validFiles.length > 0) {
      const currentFiles = form.images;
      const currentPreviews = previews.filter((url) =>
        url.startsWith("blob:")
      );

      setForm((prev) => ({
        ...prev,
        images: [...currentFiles, ...validFiles],
      }));

      setPreviews([
        ...currentPreviews,
        ...validFiles.map((file) =>
          URL.createObjectURL(file)
        ),
      ]);
    }

    e.target.value = "";
  };

  const removeImage = (index) => {
    const removed = previews[index];

    if (removed?.startsWith("blob:")) {
      URL.revokeObjectURL(removed);
    }

    const fileIndexes = previews
      .map((url, i) => (url.startsWith("blob:") ? i : -1))
      .filter((i) => i !== -1);

    const fileIndex = fileIndexes.indexOf(index);

    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );

    if (fileIndex !== -1) {
      setForm((prev) => ({
        ...prev,
        images: prev.images.filter(
          (_, i) => i !== fileIndex
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.slug.trim()) {
      setMessage("Category name and slug are required.");
      setError(true);
      return;
    }

    if (!previews.length) {
      setMessage("Please select at least one category image.");
      setError(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("slug", form.slug.trim());
      formData.append("description", form.description.trim());
      formData.append("bestProduct", String(form.bestProduct));

      form.images.forEach((file) => {
        formData.append("images", file);
      });

      const presetImage =
        previews.find((url) => !url.startsWith("blob:")) || "";

      if (presetImage) {
        formData.append("presetImage", presetImage);
      }

      // Parent component handles API request and table refresh.
      await onCategoryAdded(formData);

      clearPreviews();
      onClose();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          err.message ||
          "Unable to add category."
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2
              id="category-modal-title"
              className="text-xl font-bold text-slate-900"
            >
              Add New Category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter category details below.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 overflow-y-auto p-5 sm:p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Quick Add Category
            </label>

            <select
              value={
                CATEGORY_PRESETS.find(
                  (item) => item.name === form.name
                )?.name || ""
              }
              onChange={handlePresetChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option value="">Choose a preset category</option>
              {CATEGORY_PRESETS.map((item) => (
                <option key={item.slug} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Glass Cases"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category Slug
            </label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              placeholder="glass-cases"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category Images
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 hover:border-indigo-500 hover:bg-indigo-50">
              <FiUploadCloud
                size={32}
                className="text-indigo-600"
              />
              <span className="mt-2 text-sm font-semibold">
                Click to upload images
              </span>
              <span className="mt-1 text-xs text-slate-500">
                PNG, JPG, WEBP · Maximum 5MB per image
              </span>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {previews.map((preview, index) => (
                  <div
                    key={`${preview}-${index}`}
                    className="relative overflow-hidden rounded-xl border"
                  >
                    <img
                      src={preview}
                      alt={`Category ${index + 1}`}
                      className="h-28 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-1 top-1 rounded-full bg-red-600 p-1.5 text-white"
                    >
                      <FiX size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter category description"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4">
            <input
              type="checkbox"
              name="bestProduct"
              checked={form.bestProduct}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  bestProduct: event.target.checked,
                }))
              }
              className="h-5 w-5 accent-black"
            />
            <span className="text-sm font-semibold text-slate-700">
              Mark this category as Best Product
            </span>
          </label>

          {message && (
            <p
              role="alert"
              className={`rounded-lg p-3 text-sm ${
                error
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              <FiCheckCircle size={18} />
              {loading ? "Uploading..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;
