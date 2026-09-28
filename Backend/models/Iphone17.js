const mongoose = require("mongoose");

const iphone17Schema = new mongoose.Schema(
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

    model: {
      type: String,
      default: "iPhone 17",
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
  }
);

module.exports = mongoose.model("Iphone17", iphone17Schema);