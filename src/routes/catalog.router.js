import express from "express";
import { createCatalog, saveOrUpdateCatalog,saveOrUpdateProduct,getStockClearanceProducts, deleteCatalog, getAllCatalogs, getAllCatalogProducts } from "../controller/catalog.controller.js";

const router = express.Router();

router.post("/catalog", createCatalog);
router.post("/catalog/save", saveOrUpdateCatalog);
router.delete("/catalog/:id", deleteCatalog);
router.get("/catalog", getAllCatalogs);
router.post("/catalog/save-product", saveOrUpdateProduct); 
router.get("/stock-clearance", getStockClearanceProducts);
router.get("/catalogs", getAllCatalogProducts);


export default router;
