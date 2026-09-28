const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
      default: null,
    },

    discount: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },
    stock: { type: Number, default: 10 },
    brand: { type: String },

    category: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: "",
    },

    material: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    bestseller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
