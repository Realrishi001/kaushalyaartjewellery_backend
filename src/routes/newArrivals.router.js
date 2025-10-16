import express from "express";
import { saveOrUpdateNewArrival, getAllNewArrivals, deleteNewArrival } from "../controller/newArrivals.controller.js";

const router = express.Router();

// ✅ Routes
router.post("/new-arrivals", saveOrUpdateNewArrival); // create or update via JSON body
router.get("/new-arrivals", getAllNewArrivals);       // get all
router.delete("/new-arrivals/:id", deleteNewArrival); // delete by id

export default router;
