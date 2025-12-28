import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/paymentController.js";
import { requireAuth, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);
router.post("/create", checkRole(["customer"]), createRazorpayOrder);
router.post("/verify", checkRole(["customer"]), verifyPayment);

export default router;
