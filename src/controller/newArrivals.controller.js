import { NewArrival } from "../models/newArrivals.models.js";

// ✅ Create or Update a New Arrival
export const saveOrUpdateNewArrival = async (req, res) => {
  try {
    const { id, imageUrl, title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    let newArrival;

    if (id) {
      // Update existing record
      newArrival = await NewArrival.findByPk(id);
      if (!newArrival) {
        return res.status(404).json({
          success: false,
          message: "New arrival not found",
        });
      }

      newArrival.imageUrl = imageUrl || newArrival.imageUrl;
      newArrival.title = title || newArrival.title;
      newArrival.description = description || newArrival.description;

      await newArrival.save();

      return res.status(200).json({
        success: true,
        message: "New arrival updated successfully",
        data: newArrival,
      });
    } else {
      // Create new record
      const newRecord = await NewArrival.create({
        imageUrl,
        title,
        description,
      });

      return res.status(201).json({
        success: true,
        message: "New arrival created successfully",
        data: newRecord,
      });
    }
  } catch (error) {
    console.error("Error saving new arrival:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ✅ Get All New Arrivals
export const getAllNewArrivals = async (req, res) => {
  try {
    const arrivals = await NewArrival.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Fetched all new arrivals successfully",
      data: arrivals,
    });
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ✅ Delete by ID
export const deleteNewArrival = async (req, res) => {
  try {
    const { id } = req.params;
    const newArrival = await NewArrival.findByPk(id);

    if (!newArrival) {
      return res.status(404).json({
        success: false,
        message: "New arrival not found",
      });
    }

    await newArrival.destroy();

    return res.status(200).json({
      success: true,
      message: "New arrival deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting new arrival:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
