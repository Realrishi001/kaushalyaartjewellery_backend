import express from "express";
import { createCatalog, saveOrUpdateCatalog, deleteCatalog, getAllCatalogs } from "../controller/catalog.controller.js";

const router = express.Router();

router.post("/catalog", createCatalog);
router.post("/catalog/save", saveOrUpdateCatalog);
router.delete("/catalog/:id", deleteCatalog);
router.get("/catalog", getAllCatalogs);

export default router;
