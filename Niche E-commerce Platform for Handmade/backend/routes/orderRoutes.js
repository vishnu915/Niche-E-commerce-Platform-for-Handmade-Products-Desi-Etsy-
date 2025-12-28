import express from "express";
import {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController.js";
import { requireAuth, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.post("/place", checkRole(["customer"]), placeOrder);
router.get("/my-orders", checkRole(["customer"]), getUserOrders);

router.get("/all", checkRole(["admin"]), getAllOrders);
router.put("/update-status", checkRole(["admin"]), updateOrderStatus);

export default router;
