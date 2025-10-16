import { Accessory } from "../models/accessory.model.js";

// ✅ Create a new accessory
export const createAccessory = async (req, res) => {
  try {
    const { accessoryName, accessoryDescription, accessoryImage } = req.body;

    if (!accessoryName)
      return res
        .status(400)
        .json({ success: false, message: "Accessory name is required" });

    const newAccessory = await Accessory.create({
      accessoryName,
      accessoryDescription,
      accessoryImage,
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

// ✅ Save or update product inside accessory
export const saveOrUpdateAccessoryProduct = async (req, res) => {
  try {
    const {
      id,
      accessoryName,
      accessoryDescription,
      accessoryImage,
      productName,
      productImage,
      realPrice,
      discountPrice,
      polishType,
      size,
      aboutProduct,
    } = req.body;

    // Check if accessory exists
    const accessory = await Accessory.findByPk(id);
    if (!accessory) {
      return res
        .status(404)
        .json({ success: false, message: "Accessory not found" });
    }

    // Update the product-related fields
    accessory.productName = productName;
    accessory.productImage = productImage;
    accessory.realPrice = realPrice;
    accessory.discountPrice = discountPrice;
    accessory.polishType = polishType;
    accessory.size = size;
    accessory.aboutProduct = aboutProduct;

    await accessory.save();

    res.status(200).json({
      success: true,
      message: "Product saved successfully",
      data: accessory,
    });
  } catch (error) {
    console.error("Error saving product:", error);
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
