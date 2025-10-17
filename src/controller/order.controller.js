import { Order } from "../models/orders.model.js";
import { v4 as uuidv4 } from "uuid"; // for generating order IDs

// ✅ Save a new order
export const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      apartment,
      city,
      state,
      pincode,
      country,
      deliveryInstructions,
      paymentMethod,
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      upiId,
      items,
      subtotal,
      tax,
      shipping,
      total,
    } = req.body;

    // ✅ Basic validation
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !pincode || !items) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // ✅ Generate order ID
    const orderId = "ORD-" + uuidv4().slice(0, 8).toUpperCase();

    // ✅ Create order record
    const order = await Order.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      apartment,
      city,
      state,
      pincode,
      country,
      deliveryInstructions,
      paymentMethod,
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      upiId,
      items,
      subtotal,
      tax,
      shipping,
      total,
      orderId,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId,
      data: order,
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while saving order",
      error: error.message,
    });
  }
};

// ✅ Optional: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};
