import { Media } from "../models/media.model.js";

// ✅ Controller to upload or update media
export const saveOrUpdateMedia = async (req, res) => {
  try {
    const image = req.files?.image?.[0];
    const video = req.files?.video?.[0];

    const imageUrl = image ? `/uploads/${image.filename}` : null;
    const videoUrl = video ? `/uploads/${video.filename}` : null;

    let existing = await Media.findOne();

    if (existing) {
      if (imageUrl) existing.imageUrl = imageUrl;
      if (videoUrl) existing.videoUrl = videoUrl;
      await existing.save();
      return res.status(200).json({
        success: true,
        message: "Media updated successfully",
        data: existing,
      });
    } else {
      const newMedia = await Media.create({ imageUrl, videoUrl });
      return res.status(201).json({
        success: true,
        message: "Media created successfully",
        data: newMedia,
      });
    }
  } catch (error) {
    console.error("Error saving media:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ✅ Controller to get the latest media (image & video)
export const getMedia = async (req, res) => {
  try {
    const media = await Media.findOne({ order: [["updatedAt", "DESC"]] });

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "No media found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Media fetched successfully",
      data: media,
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
