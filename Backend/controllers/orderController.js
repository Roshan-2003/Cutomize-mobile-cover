const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const isValidShippingAddress = (address) => {
  const requiredFields = ["fullName", "phone", "address", "city", "state", "pincode"];

  if (!address || typeof address !== "object") return false;

  return requiredFields.every(
    (field) => typeof address[field] === "string" && address[field].trim().length > 0,
  );
};

const createOrder = async (req, res) => {
  try {
    const {
      user,
      userId,
      paymentMethod,
      shippingAddress,
      razorpayOrderId,
      razorpayPaymentId,
    } = req.body;

    const customerId = user || userId;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ success: false, message: "A valid user is required" });
    }

    if (!isValidShippingAddress(shippingAddress)) {
      return res.status(400).json({
        success: false,
        message: "Complete shipping information is required",
      });
    }

    const cart = await Cart.findOne({ user: customerId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const orderItems = cart.items
      .filter((item) => item.product)
      .map((item) => ({
        product: item.product._id,
        title: item.product.title,
        selectedModel: item.selectedModel || "iPhone 16 Pro Max",
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
      }));

    if (orderItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart products are unavailable" });
    }

    const calculatedTotal = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: customerId,
      items: orderItems,
      totalAmount: calculatedTotal,
      paymentMethod,

      razorpayOrderId: paymentMethod === "ONLINE" ? razorpayOrderId : null,
      razorpayPaymentId: paymentMethod === "ONLINE" ? razorpayPaymentId : null,

      paymentStatus:
        paymentMethod === "COD" ? "PENDING" : "PAID",

      orderStatus:
        paymentMethod === "COD" ? "CONFIRMED" : "PLACED",

      shippingAddress,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.orderId
    ).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
};

