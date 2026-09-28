const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/", addToCart);

router.get("/:userId", getCart);

router.put("/:userId/:productId", updateCartQuantity);

router.delete("/:userId/:productId", removeFromCart);

module.exports = router;