import { Catalog } from "../models/catalog.model.js";

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
    } = req.body;

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

    // ✅ Step 2: If the catalog already has this product, update it
    if (catalog.productName === productName) {
      await catalog.update({
        productImage,
        realPrice,
        discountPrice,
        polishType,
        size,
        aboutProduct,
      });

      return res.status(200).json({
        success: true,
        message: `Product '${productName}' updated successfully in catalog '${catalogName}'`,
        data: catalog,
      });
    }

    // ✅ Step 3: If productName is different → create new catalog entry for that product
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
    });

    return res.status(201).json({
      success: true,
      message: `Product '${productName}' added successfully to catalog '${catalogName}'`,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error saving/updating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};