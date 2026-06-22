import { Product } from "../product/product.model.js";
import { Review } from "./review.model.js";

export const createReviewIntoDB = async (payload) => {
  const review = await Review.create(payload);

  await updateProductRating(payload.product);

  return review;
};

// ⭐ recalculate rating
export const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });

  const totalRatings = reviews.length;

  const avg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalRatings || 1);

  await Product.findByIdAndUpdate(productId, {
    averageRating: avg,
    totalRatings,
  });
};

// GET reviews by product
export const getReviewsByProductFromDB = async (productId) => {
  return Review.find({ product: productId })
    .populate("user", "name phone")
    .sort({ createdAt: -1 });
};

// DELETE review

export const deleteReviewService = async ({ userId, productId }) => {
  // find review by BOTH conditions
  const review = await Review.findOneAndDelete({
    user: userId,
    product: productId,
  });

  return review; // returns deleted doc or null
};
