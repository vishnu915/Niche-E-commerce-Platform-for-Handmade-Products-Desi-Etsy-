import express from "express";
import {
  getPendingArtisans,
  approveArtisan,
  rejectArtisan,
  getPendingProducts,
  approveProduct,
  rejectProduct,
} from "../controllers/adminController.js";
import { requireAuth, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);
router.use(checkRole(["admin"]));

router.get("/pending-artisans", getPendingArtisans);
router.put("/approve-artisan/:artisanId", approveArtisan);
router.delete("/reject-artisan/:artisanId", rejectArtisan);

router.get("/pending-products", getPendingProducts);
router.put("/approve-product/:id", approveProduct);
router.delete("/reject-product/:id", rejectProduct);

export default router;
