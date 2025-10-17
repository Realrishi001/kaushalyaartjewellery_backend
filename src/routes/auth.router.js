import express from "express";
import { signUp, login, getUserById } from "../controller/auth.controller.js";

const router = express.Router();

// ✅ Auth Routes
router.post("/signup", signUp);
router.post("/login", login);
router.get("/user/:id", getUserById);

export default router;
