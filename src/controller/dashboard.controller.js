import { Order } from "../models/orders.model.js";
import { Sequelize } from "sequelize";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.count();
    const totalRevenueData = await Order.findAll({
      attributes: [[Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"]],
      raw: true,
    });
    const totalRevenue = parseFloat(totalRevenueData[0].totalRevenue || 0);

    const totalCustomers = await Order.count({
      distinct: true,
      col: "email",
    });

    // Group by state (top-performing locations)
    const topStates = await Order.findAll({
      attributes: [
        "state",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "orderCount"],
      ],
      group: ["state"],
      order: [[Sequelize.literal("orderCount"), "DESC"]],
      limit: 5,
      raw: true,
    });

    // Recent orders
    const recentOrders = await Order.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        totalCustomers,
        topStates,
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
