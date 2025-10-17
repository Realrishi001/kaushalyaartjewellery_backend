import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // ✅ keep this in .env file

// ✅ Sign Up Controller
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password, // ✅ gets hashed automatically via hooks
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token, // ✅ send to frontend
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get User Details by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ["id", "firstName", "lastName", "email", "createdAt"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
