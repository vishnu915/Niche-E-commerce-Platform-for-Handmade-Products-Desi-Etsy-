import express from "express";
import {
  getApprovedArtisansController,
  getMeController,
} from "../controllers/publicController.js";

const router = express.Router();

router.get("/approved-artisans", getApprovedArtisansController);
router.get("/me", getMeController);

export default router;
