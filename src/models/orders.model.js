import { sequelizeCon, DataTypes } from "../init/dbConnection.js";

const Order = sequelizeCon.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // 🧍 Customer Info
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 📦 Shipping Info
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apartment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "India",
    },
    deliveryInstructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // 💳 Payment Info
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "cod", // cod | card | upi | netbanking
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiryDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    upiId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // 🛒 Cart Summary
    items: {
      type: DataTypes.JSON, // ✅ stores all cart items (array)
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shipping: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    // 📅 Order Info
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending", // Pending | Shipped | Delivered | Cancelled
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export { Order };
