import { Accessory } from "../models/accessory.model.js";
import { Catalog } from "../models/catalog.model.js";
import { Op } from "sequelize"; // ✅ Important

// ✅ Fetch all products from both Accessory and Catalog
export const getAllProducts = async (req, res) => {
  try {
    // ✅ Use Sequelize Op.ne (not equal) to filter non-null product names
    const accessories = await Accessory.findAll({
      where: { productName: { [Op.ne]: null } },
      attributes: [
        "id",
        "accessoryName",
        "productName",
        "productImage",
        "realPrice",
        "discountPrice",
        "polishType",
        "size",
        "aboutProduct",
        "quantityAvailable",
        "createdAt",
      ],
    });

    const catalogs = await Catalog.findAll({
      where: { productName: { [Op.ne]: null } },
      attributes: [
        "id",
        "catalogName",
        "productName",
        "productImage",
        "realPrice",
        "discountPrice",
        "polishType",
        "size",
        "aboutProduct",
        "quantityAvailable",
        "createdAt",
      ],
    });

    // ✅ Combine both datasets
    const allProducts = [
      ...accessories.map((a) => ({
        id: `A-${a.id}`,
        name: a.productName,
        category: a.accessoryName,
        image: a.productImage,
        realPrice: parseFloat(a.realPrice),
        discountPrice: parseFloat(a.discountPrice),
        quantityAvailable: a.quantityAvailable,
        polishType: a.polishType,
        size: a.size,
        aboutProduct: a.aboutProduct,
        source: "Accessory",
        createdAt: a.createdAt,
      })),
      ...catalogs.map((c) => ({
        id: `C-${c.id}`,
        name: c.productName,
        category: c.catalogName,
        image: c.productImage,
        realPrice: parseFloat(c.realPrice),
        discountPrice: parseFloat(c.discountPrice),
        quantityAvailable: c.quantityAvailable,
        polishType: c.polishType,
        size: c.size,
        aboutProduct: c.aboutProduct,
        source: "Catalog",
        createdAt: c.createdAt,
      })),
    ];

    // ✅ Sort newest first
    allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      count: allProducts.length,
      data: allProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
