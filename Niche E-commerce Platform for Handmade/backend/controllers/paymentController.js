import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/orderModel.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    await Order.findOneAndUpdate(
      { razorpayOrderId: orderId },
      {
        paymentStatus: "Paid",
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
      }
    );

    res.status(200).json({ message: "Payment verified" });
  } catch (err) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};
