import { Accessory } from "../models/accessory.model.js";

// ✅ Create a new accessory
export const createAccessory = async (req, res) => {
  try {
    const { accessoryName, accessoryDescription, accessoryImage, quantityAvailable } = req.body;

    if (!accessoryName)
      return res
        .status(400)
        .json({ success: false, message: "Accessory name is required" });

    const newAccessory = await Accessory.create({
      accessoryName,
      accessoryDescription,
      accessoryImage,
      quantityAvailable: quantityAvailable || 0, // ✅ default to 0 if not provided
    });

    res.status(201).json({ success: true, data: newAccessory });
  } catch (error) {
    console.error("Error creating accessory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get all accessories
export const getAllAccessories = async (req, res) => {
  try {
    const data = await Accessory.findAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete accessory
export const deleteAccessory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Accessory.destroy({ where: { id } });

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Accessory not found" });

    res
      .status(200)
      .json({ success: true, message: "Accessory deleted successfully" });
  } catch (error) {
    console.error("Error deleting accessory:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Save or update accessory product (with quantityAvailable)
export const saveOrUpdateAccessoryProduct = async (req, res) => {
  try {
    const {
      accessoryName,
      productName,
      productImage,
      realPrice,
      discountPrice,
      polishType,
      size,
      aboutProduct,
      quantityAvailable, // ✅ New field added
    } = req.body;

    console.log(quantityAvailable);

    // Validation
    if (!accessoryName || !productName) {
      return res.status(400).json({
        success: false,
        message: "Both accessoryName and productName are required",
      });
    }

    // ✅ Step 1: Find the accessory by name
    const parentAccessory = await Accessory.findOne({ where: { accessoryName } });

    if (!parentAccessory) {
      return res.status(404).json({
        success: false,
        message: `Accessory '${accessoryName}' not found`,
      });
    }

    // ✅ Step 2: Check if this product already exists for this accessory
    const existingProduct = await Accessory.findOne({
      where: {
        accessoryName,
        productName,
      },
    });

    // ✅ Step 3: If exists, update product
    if (existingProduct) {
      await existingProduct.update({
        productImage,
        realPrice,
        discountPrice,
        polishType,
        size,
        aboutProduct,
        quantityAvailable: quantityAvailable ?? existingProduct.quantityAvailable, // ✅ update if provided
      });

      return res.status(200).json({
        success: true,
        message: `Product '${productName}' updated successfully under '${accessoryName}'`,
        data: existingProduct,
      });
    }

    // ✅ Step 4: Else create a new product entry under same accessory name
    const newProduct = await Accessory.create({
      accessoryName,
      accessoryDescription: parentAccessory.accessoryDescription,
      accessoryImage: parentAccessory.accessoryImage,
      productName,
      productImage,
      realPrice,
      discountPrice,
      polishType,
      size,
      aboutProduct,
      quantityAvailable: quantityAvailable || 0, // ✅ Default to 0 if not provided
    });

    return res.status(201).json({
      success: true,
      message: `New product '${productName}' added successfully under '${accessoryName}'`,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error saving/updating accessory product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
