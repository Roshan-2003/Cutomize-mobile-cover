const express = require("express");

const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/user/:userId", getUserOrders);
router.get("/:orderId", getOrder);
router.put("/:orderId", updateOrderStatus);

module.exports = router;