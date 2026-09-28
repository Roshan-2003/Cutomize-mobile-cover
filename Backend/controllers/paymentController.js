const crypto = require("crypto");
const razorpay = require("../config/razorpay");

// Create Razorpay Order
const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid positive amount is required",
      });
    }

    const options = {
      amount: Math.round(amount * 100), // convert INR to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    const keyId = (process.env.RAZORPAY_KEY_ID || "").trim();

    res.status(200).json({
      success: true,
      order,
      keyId,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);

    const detailMsg = error.error?.description || error.message || "Authentication failed";

    res.status(500).json({
      success: false,
      message: `Razorpay Error: ${detailMsg}. Please check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Backend/.env.`,
    });
  }
};

// Verify Payment Signature
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "razorpay_order_id, razorpay_payment_id and razorpay_signature are required",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature verification",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Payment verification failed",
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
