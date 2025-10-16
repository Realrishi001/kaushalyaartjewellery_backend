import express from "express";
import { addBestSellerCategory, saveOrUpdateBestSeller, getAllBestSellers, deleteBestSeller } from "../controller/bestSellter.controller.js";
const router = express.Router();

// ✅ Routes
router.post("/bestseller", addBestSellerCategory);
router.post("/bestseller/save", saveOrUpdateBestSeller);
router.get("/bestseller", getAllBestSellers);
router.delete("/bestseller/:id", deleteBestSeller);

export default router;
