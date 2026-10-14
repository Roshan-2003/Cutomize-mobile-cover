const Category = require("../models/Category");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const saveCategoryImage = (file) =>
  new Promise((resolve, reject) => {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return reject(
        new Error(
          "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
        )
      );
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "mobile-cover-categories", resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, image, images, presetImage, description } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const categorySlug = (slug || name)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existingCategory = await Category.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${name.trim()}$`, "i") } },
        { slug: categorySlug },
      ],
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: `Category "${existingCategory.name}" already exists`,
      });
    }

    // 1. Upload files from req.files or req.file to Cloudinary
    let uploadedUrls = [];
    const filesToUpload = req.files || (req.file ? [req.file] : []);
    if (filesToUpload.length > 0) {
      uploadedUrls = await Promise.all(
        filesToUpload.map((file) => saveCategoryImage(file))
      );
    }

    // 2. Preset or body image URLs
    const presetUrls = [presetImage, image]
      .filter((url) => typeof url === "string" && url.trim().length > 0)
      .map((url) => url.trim());

    const bodyImages = (Array.isArray(images) ? images : [images])
      .filter((img) => typeof img === "string" && img.trim().length > 0)
      .map((img) => img.trim());

    const allImages = [...uploadedUrls, ...presetUrls, ...bodyImages];
    const primaryImage = allImages[0] || "";

    const category = await Category.create({
      name: name.trim(),
      slug: categorySlug,
      image: primaryImage,
      images: allImages.length ? allImages : [primaryImage].filter(Boolean),
      description: description ? description.trim() : "",
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create category",
    });
  }
};

// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {
    const filter = {};

    // Only filter by isActive if explicitly requested; default includes all active/non-false
    if (req.query.all !== "true") {
      filter.isActive = { $ne: false };
    }

    const categories = await Category.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch categories",
    });
  }
};

// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, image, images, presetImage, description, isActive } =
      req.body || {};

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Category name cannot be empty",
        });
      }

      category.name = name.trim();
    }

    if (slug !== undefined || name !== undefined) {
      const slugSource = slug ?? category.name;

      category.slug = slugSource
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // Check uploaded files
    let uploadedUrls = [];
    const filesToUpload = req.files || (req.file ? [req.file] : []);
    if (filesToUpload.length > 0) {
      uploadedUrls = await Promise.all(
        filesToUpload.map((file) => saveCategoryImage(file))
      );
    }

    const presetUrls = [presetImage, image]
      .filter((url) => typeof url === "string" && url.trim().length > 0)
      .map((url) => url.trim());

    if (
      uploadedUrls.length > 0 ||
      presetUrls.length > 0 ||
      images !== undefined
    ) {
      const bodyImages = (Array.isArray(images) ? images : [images])
        .filter((img) => typeof img === "string" && img.trim().length > 0)
        .map((img) => img.trim());

      const allImages = [...uploadedUrls, ...presetUrls, ...bodyImages];
      if (allImages.length > 0) {
        category.images = allImages;
        category.image = allImages[0];
      }
    }

    if (description !== undefined) {
      category.description = description.trim();
    }

    if (isActive !== undefined) {
      category.isActive = isActive === true || isActive === "true";
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category name or slug already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update category",
    });
  }
};

// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete category",
    });
  }
};