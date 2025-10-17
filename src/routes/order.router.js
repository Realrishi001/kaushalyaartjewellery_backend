import express from "express";
import { createOrder, getAllOrders } from "../controller/order.controller.js";

const router = express.Router();

// POST → Save new order
router.post("/orders", createOrder);

// GET → Fetch all orders
router.get("/orders", getAllOrders);

export default router;
