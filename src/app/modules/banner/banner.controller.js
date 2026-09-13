import {
  addBannerImageIntoDB,
  createBannerIntoDB,
  deleteBannerFromDB,
  getAllBannerFromDB,
  getSingleBannerFromDB,
  removeBannerImageByIndexFromDB,
  removeBannerImageFromDB,
  updateBannerImagesIntoDB,
} from "./banner.service.js";

/* ===============================
   CREATE
================================ */
export const createBanner = async (req, res) => {
  try {
    console.log("CREATE BANNER BODY:", req.body);

    const result = await createBannerIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: result,
    });
  } catch (error) {
    console.error("CREATE BANNER ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET ALL
================================ */

export const getAllBanners = async (req, res) => {
  try {
    const result = await getAllBannerFromDB();

    res.status(200).json({
      success: true,
      message: "Banners retrieved successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET SINGLE
================================ */

export const getSingleBanner = async (req, res) => {
  try {
    const result = await getSingleBannerFromDB(req.params.id);

    res.status(200).json({
      success: true,
      message: "Banner retrieved successfully.",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   UPDATE ALL IMAGES
================================ */

export const updateBannerImages = async (req, res) => {
  try {
    const { images } = req.body;

    const result = await updateBannerImagesIntoDB(req.params.id, images);

    res.status(200).json({
      success: true,
      message: "Images updated successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   ADD IMAGE
================================ */

export const addBannerImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const result = await addBannerImageIntoDB(req.params.id, imageUrl);

    res.status(200).json({
      success: true,
      message: "Image added successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   REMOVE IMAGE
================================ */

export const removeBannerImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const result = await removeBannerImageFromDB(req.params.id, imageUrl);

    res.status(200).json({
      success: true,
      message: "Image removed successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   REMOVE IMAGE BY INDEX
================================ */

export const removeBannerImageByIndex = async (req, res) => {
  try {
    const result = await removeBannerImageByIndexFromDB(
      req.params.id,
      req.params.index,
    );

    res.status(200).json({
      success: true,
      message: "Image removed successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   DELETE Banner
================================ */

export const deleteBanner = async (req, res) => {
  try {
    const result = await deleteBannerFromDB(req.params.id);

    res.status(200).json({
      success: true,
      message: "Banner  successfully.",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
