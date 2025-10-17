import express from "express";
import { createCatalog, saveOrUpdateCatalog,saveOrUpdateProduct, deleteCatalog, getAllCatalogs } from "../controller/catalog.controller.js";

const router = express.Router();

router.post("/catalog", createCatalog);
router.post("/catalog/save", saveOrUpdateCatalog);
router.delete("/catalog/:id", deleteCatalog);
router.get("/catalog", getAllCatalogs);
router.post("/catalog/save-product", saveOrUpdateProduct); 

export default router;
