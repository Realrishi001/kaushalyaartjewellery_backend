import express from "express";
import { signUp, login, getUserById, getAllUsers } from "../controller/auth.controller.js";

const router = express.Router();

// ✅ Auth Routes
router.post("/signup", signUp);
router.post("/login", login);
router.get("/user/:id", getUserById);
router.get("/user", getAllUsers);

export default router;
