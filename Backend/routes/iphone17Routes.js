
const express = require("express");

const router = express.Router();

const {
  getIphone17Products,
  getIphone17Product,
  createIphone17Product,
  updateIphone17Product,
  deleteIphone17Product,
} = require("../controllers/iphone17Controller");

// Get all iPhone products
router.get("/", getIphone17Products);

// Get single iPhone product
router.get("/:id", getIphone17Product);

// Create iPhone product
router.post("/", createIphone17Product);

// Update iPhone product
router.put("/:id", updateIphone17Product);

// Delete iPhone product
router.delete("/:id", deleteIphone17Product);

module.exports = router;