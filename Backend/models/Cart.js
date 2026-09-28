const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    selectedModel: {
      type: String,
      default: "iPhone 16 Pro Max",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, index: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
