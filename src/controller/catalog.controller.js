import { Catalog } from "../models/catalog.model.js";
import { Op } from "sequelize";

/**
 * ✅ Create a new catalog (with name, description & image)
 */
export const createCatalog = async (req, res) => {
  try {
    const { catalogName, catalogDescription, catalogImage } = req.body;

    if (!catalogName) {
      return res.status(400).json({
        success: false,
        message: "Catalog name is required",
      });
    }

    const catalog = await Catalog.create({
      catalogName,
      catalogDescription,
      catalogImage, // ✅ new field
    });

    res.status(201).json({
      success: true,
      message: "Catalog created successfully",
      data: catalog,
    });
  } catch (error) {
    console.error("Error creating catalog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * ✅ Save or Update full catalog details (including catalogImage)
 */
export const saveOrUpdateCatalog = async (req, res) => {
  try {
    const {
      id,
      catalogName,
      catalogDescription,
      catalogImage,
      productName,
      productImage,
      realPrice,
      discountPrice,
      polishType,
      size,
      aboutProduct,
    } = req.body;

    if (!catalogName) {
      return res.status(400).json({
        success: false,
        message: "Catalog name is required",
      });
    }

    let catalog;

    if (id) {
      catalog = await Catalog.findByPk(id);
      if (!catalog) {
        return res.status(404).json({
          success: false,
          message: "Catalog not found",
        });
      }

      await catalog.update({
        catalogName,
        catalogDescription,
        catalogImage,
        productName,
        productImage,
        realPrice,
        discountPrice,
        polishType,
        size,
        aboutProduct,
      });

      return res.status(200).json({
        success: true,
        message: "Catalog updated successfully",
        data: catalog,
      });
    } else {
      const newCatalog = await Catalog.create({
        catalogName,
        catalogDescription,
        catalogImage,
        productName,
        productImage,
        realPrice,
        discountPrice,
        polishType,
        size,
        aboutProduct,
      });

      return res.status(201).json({
        success: true,
        message: "Catalog created successfully",
        data: newCatalog,
      });
    }
  } catch (error) {
    console.error("Error saving/updating catalog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * ✅ Delete a catalog by ID
 */
export const deleteCatalog = async (req, res) => {
  try {
    const { id } = req.params;

    const catalog = await Catalog.findByPk(id);
    if (!catalog) {
      return res.status(404).json({
        success: false,
        message: "Catalog not found",
      });
    }

    await catalog.destroy();

    res.status(200).json({
      success: true,
      message: "Catalog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting catalog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * ✅ Get all catalogs
 */
export const getAllCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Fetched all catalogs successfully",
      data: catalogs,
    });
  } catch (error) {
    console.error("Error fetching catalogs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const saveOrUpdateProduct = async (req, res) => {
  try {
    const {
      catalogName,
      productName,
      productImage,
      realPrice,
      discountPrice,
      polishType,
      size,
      aboutProduct,
      quantityAvailable, // ✅ Added field
    } = req.body;

    // ✅ Basic validation
    if (!catalogName || !productName) {
      return res.status(400).json({
        success: false,
        message: "Both catalogName and productName are required",
      });
    }

    // ✅ Step 1: Find the catalog by name
    const catalog = await Catalog.findOne({ where: { catalogName } });

    if (!catalog) {
      return res.status(404).json({
        success: false,
        message: `Catalog '${catalogName}' not found`,
      });
    }

    // ✅ Step 2: Check if this product already exists (based on catalog + productName)
    const existingProduct = await Catalog.findOne({
      where: {
        catalogName,
        productName,
      },
    });

    // ✅ Step 3: If exists, update it
    if (existingProduct) {
      await existingProduct.update({
        productImage,
        realPrice,
        discountPrice,
        polishType,
        size,
        aboutProduct,
        quantityAvailable:
          quantityAvailable !== undefined && quantityAvailable !== null
            ? quantityAvailable
            : existingProduct.quantityAvailable, // ✅ Update only if provided
      });

      return res.status(200).json({
        success: true,
        message: `Product '${productName}' updated successfully in catalog '${catalogName}'`,
        data: existingProduct,
      });
    }

    // ✅ Step 4: Else create new product under same catalog
    const newProduct = await Catalog.create({
      catalogName,
      catalogDescription: catalog.catalogDescription,
      catalogImage: catalog.catalogImage,
      productName,
      productImage,
      realPrice,
      discountPrice,
      polishType,
      size,
      aboutProduct,
      quantityAvailable:
        quantityAvailable !== undefined && quantityAvailable !== null
          ? quantityAvailable
          : 0, // ✅ Default to 0 if not provided
    });

    return res.status(201).json({
      success: true,
      message: `Product '${productName}' added successfully to catalog '${catalogName}'`,
      data: newProduct,
    });
  } catch (error) {
    console.error("❌ Error saving/updating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const getStockClearanceProducts = async (req, res) => {
  try {
    // Fetch all products where catalogName matches "Stock Clearance Sale"
    const clearanceProducts = await Catalog.findAll({
      where: {
        catalogName: {
          [Op.like]: "%Stock Clearance Sale%", // case-insensitive partial match
        },
      },
      attributes: [
        "id",
        "catalogName",
        "catalogDescription",
        "catalogImage",
        "productName",
        "productImage",
        "realPrice",
        "discountPrice",
        "polishType",
        "size",
        "aboutProduct",
        "quantityAvailable",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]], // latest products first
    });

    if (!clearanceProducts.length) {
      return res.status(404).json({
        success: false,
        message: "No products found under 'Stock Clearance Sale'.",
      });
    }

    return res.status(200).json({
      success: true,
      count: clearanceProducts.length,
      data: clearanceProducts,
    });
  } catch (error) {
    console.error("Error fetching Stock Clearance products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching Stock Clearance products.",
      error: error.message,
    });
  }
};


export const getAllCatalogProducts = async (req, res) => {
  try {
    const products = await Catalog.findAll({
      order: [["createdAt", "DESC"]], // optional: latest first
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in the catalog.",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "All catalog products fetched successfully.",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching catalog products:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching catalog products.",
      error: error.message,
    });
  }
};
