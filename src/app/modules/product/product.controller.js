import {
  createProductIntoDB,
  getAllDeletedProductsFromDB,
  getAllProductsFromDB,
  getProductByCodeFromDB,
  getProductByIdFromDB,
  getProductMenuFromDB,
  restoreDeleteProductFromDB,
  softDeleteProductFromDB,
  updateProductIntoDB,
} from "./product.service.js";

export const createProduct = async (req, res) => {
  try {
    const result = await createProductIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateProductIntoDB(id, req.body);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

export const addProductRating = async (req, res) => {
  try {
    const { id } = req.params; // product id
    const { userId, rating } = req.body;

    const result = await addRatingIntoDB(id, userId, rating);

    res.status(200).json({
      success: true,
      message: "Rating submitted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await getAllProductsFromDB(req.query);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getProductByIdFromDB(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};

export const getProductByCode = async (req, res) => {
  try {
    const { productCode } = req.params;

    const result = await getProductByCodeFromDB(productCode);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};

export const getAllDeletedProducts = async (req, res) => {
  try {
    const result = await getAllDeletedProductsFromDB();

    res.status(200).json({
      success: true,
      message: "Deleted products retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get deleted products",
    });
  }
};

export const softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await softDeleteProductFromDB(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};

export const restoreDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await restoreDeleteProductFromDB(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};

export const getProductMenu = async (req, res) => {
  try {
    const result = await getProductMenuFromDB();

    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch menu",
    });
  }
};
