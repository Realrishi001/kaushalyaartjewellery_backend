import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { saveOrUpdateMedia, getMedia } from "../controller/media.controller.js";

const router = express.Router();

// ✅ Ensure 'uploads' folder exists automatically
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 'uploads' folder created automatically");
}

// ✅ Multer setup for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // multer now writes safely
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Test route
router.get("/test", (req, res) => {
  res.status(200).json({ message: "✅ Media router connected successfully!" });
});

// ✅ Upload / Update Media
router.post(
  "/media/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  saveOrUpdateMedia
);

// ✅ Get Latest Media
router.get("/media/latest", getMedia);  

export default router;
