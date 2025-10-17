import express from "express";
import { getAllProducts } from "../controller/product.controller.js";

const router = express.Router();

// ✅ GET /api/products → Get all products
router.get("/products", getAllProducts);

export default router;
