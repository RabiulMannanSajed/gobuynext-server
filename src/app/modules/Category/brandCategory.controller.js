import {
  createBrandCategoryIntoDB,
  deleteBrandCategoryFromDB,
  getAllBrandCategoriesFromDB,
  getBrandCategoryByIdFromDB,
  updateBrandCategoryInDB,
} from "./brandCategory.service.js";

export const createBrandCategory = async (req, res) => {
  try {
    const result = await createBrandCategoryIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Brand category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBrandCategories = async (req, res) => {
  try {
    const result = await getAllBrandCategoriesFromDB(req.query);

    res.status(200).json({
      success: true,
      message: "Brand categories fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBrandCategoryById = async (req, res) => {
  try {
    const result = await getBrandCategoryByIdFromDB(req.params.id);

    res.status(200).json({
      success: true,
      message: "Brand category fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBrandCategory = async (req, res) => {
  try {
    const result = await updateBrandCategoryInDB(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Brand category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBrandCategory = async (req, res) => {
  try {
    const result = await deleteBrandCategoryFromDB(req.params.id);

    res.status(200).json({
      success: true,
      message: "Brand category deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
