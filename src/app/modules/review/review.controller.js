import {
  createReviewIntoDB,
  deleteReviewService,
  getReviewsByProductFromDB,
} from "./review.service.js";

// CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const result = await createReviewIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET REVIEWS BY PRODUCT
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await getReviewsByProductFromDB(productId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE REVIEW

export const deleteReviewController = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "userId and productId are required",
      });
    }

    const result = await deleteReviewService({ userId, productId });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
