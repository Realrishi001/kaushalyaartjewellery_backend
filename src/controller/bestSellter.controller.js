import { BestSeller } from "../models/bestSeller.model.js";

// ✅ Add a new BestSeller category (with optional image)
export const addBestSellerCategory = async (req, res) => {
  try {
    const { bestSellerName, bestSellerDescription, bestSellerImage } = req.body;

    const newCategory = await BestSeller.create({
      bestSellerName,
      bestSellerDescription,
      bestSellerImage: bestSellerImage || null,
    });

    return res.status(201).json({
      success: true,
      message: "Best Seller category created successfully!",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error adding Best Seller category:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ✅ Save or update full product data (based on ID)
export const saveOrUpdateBestSeller = async (req, res) => {
  try {
    const {
      id,
      bestSellerName,
      bestSellerDescription,
      bestSellerImage,
      productName,
      productImages,
      realPrice,
      discountPrice,
      polishType,
      size,
      aboutProduct,
    } = req.body;

    let record;

    if (id) {
      record = await BestSeller.findByPk(id);
      if (!record) return res.status(404).json({ success: false, message: "Best Seller not found" });

      await record.update({
        bestSellerName,
        bestSellerDescription,
        bestSellerImage,
        productName,
        productImages,
        realPrice,
        discountPrice,
        polishType,
        size,
        aboutProduct,
      });

      return res.status(200).json({
        success: true,
        message: "Best Seller updated successfully!",
        data: record,
      });
    } else {
      const newRecord = await BestSeller.create({
        bestSellerName,
        bestSellerDescription,
        bestSellerImage,
        productName,
        productImages,
        realPrice,
        discountPrice,
        polishType,
        size,
        aboutProduct,
      });

      return res.status(201).json({
        success: true,
        message: "Best Seller product added successfully!",
        data: newRecord,
      });
    }
  } catch (error) {
    console.error("Error saving/updating Best Seller:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ✅ Delete a Best Seller entry
export const deleteBestSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await BestSeller.findByPk(id);

    if (!record) return res.status(404).json({ success: false, message: "Best Seller not found" });

    await record.destroy();
    return res.status(200).json({ success: true, message: "Best Seller deleted successfully!" });
  } catch (error) {
    console.error("Error deleting Best Seller:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ✅ Fetch all Best Sellers
export const getAllBestSellers = async (req, res) => {
  try {
    const allBestSellers = await BestSeller.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Best Sellers fetched successfully!",
      data: allBestSellers,
    });
  } catch (error) {
    console.error("Error fetching Best Sellers:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
