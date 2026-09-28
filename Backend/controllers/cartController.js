const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const isPositiveInteger = (value) =>
  Number.isInteger(Number(value)) && Number(value) > 0;

const populateAndCalculateTotal = async (cart) => {
  await cart.populate("items.product");

  cart.items = cart.items.filter((item) => item.product);
  cart.totalAmount = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

const invalidIdResponse = (res) =>
  res.status(400).json({
    success: false,
    message: "userId and productId must be valid IDs",
  });

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1, selectedModel = "iPhone 16 Pro Max" } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "userId and productId are required",
      });
    }

    if (!isValidId(userId) || !isValidId(productId)) {
      return invalidIdResponse(res);
    }

    if (!isPositiveInteger(quantity)) {
      return res.status(400).json({
        success: false,
        message: "quantity must be a positive whole number",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Match by both product ID AND selectedModel
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        (item.selectedModel || "") === (selectedModel || "")
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        selectedModel: selectedModel || "iPhone 16 Pro Max",
        quantity: Number(quantity),
      });
    }

    await populateAndCalculateTotal(cart);
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!isValidId(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [], totalAmount: 0 },
      });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity, itemId, selectedModel } = req.body;

    if (!isValidId(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    if (!isPositiveInteger(quantity)) {
      return res.status(400).json({
        success: false,
        message: "quantity must be a positive whole number",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Match by itemId if passed, else by productId & selectedModel, else by productId
    const item = cart.items.find((cartItem) => {
      if (itemId && cartItem._id) {
        return cartItem._id.toString() === itemId;
      }
      if (selectedModel) {
        return cartItem.product.toString() === productId && cartItem.selectedModel === selectedModel;
      }
      return cartItem.product.toString() === productId;
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = Number(quantity);
    await populateAndCalculateTotal(cart);
    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { itemId, selectedModel } = req.query;

    if (!isValidId(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const originalItemCount = cart.items.length;

    cart.items = cart.items.filter((item) => {
      if (itemId && item._id) {
        return item._id.toString() !== itemId;
      }
      if (selectedModel) {
        return !(item.product.toString() === productId && item.selectedModel === selectedModel);
      }
      return item.product.toString() !== productId;
    });

    if (cart.items.length === originalItemCount) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    await populateAndCalculateTotal(cart);
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addToCart, getCart, updateCartQuantity, removeFromCart };
