import express from "express";
import { createAccessory, getAllAccessories, saveOrUpdateAccessoryProduct, deleteAccessory } from "../controller/accessory.controller.js";

const router = express.Router();

// Add new accessory
router.post("/accessory", createAccessory);

// Get all accessories
router.get("/accessory", getAllAccessories);

// Save or update accessory product
router.post("/accessory/save", saveOrUpdateAccessoryProduct);

// Delete accessory
router.delete("/accessory/:id", deleteAccessory);

router.post("/accessory/save-product", saveOrUpdateAccessoryProduct);


export default router;
