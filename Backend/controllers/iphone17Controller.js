const Iphone17 = require("../models/Iphone17");

const getIphone17Products = async (req, res) => {
  try {
    const products = await Iphone17.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getIphone17Product = async (req, res) => {
  try {
    const product = await Iphone17.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "iPhone product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create iPhone 17 product
const createIphone17Product = async (req, res) => {
  try {
    const product = await Iphone17.create(req.body);

    res.status(201).json({
      success: true,
      message: "iPhone product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update iPhone 17 product
const updateIphone17Product = async (req, res) => {
  try {
    const product = await Iphone17.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "iPhone product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "iPhone product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete iPhone 17 product
const deleteIphone17Product = async (req, res) => {
  try {
    const product = await Iphone17.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "iPhone product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "iPhone product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getIphone17Products,
  getIphone17Product,
  createIphone17Product,
  updateIphone17Product,
  deleteIphone17Product,
};