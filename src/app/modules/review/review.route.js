import { Router } from "express";
import {
  createReview,
  deleteReviewController,
  getReviewsByProduct,
} from "./review.controller.js";

const route = Router();

// CREATE
route.post("/review/create", createReview);

// GET BY PRODUCT
route.get("/review/product/:productId", getReviewsByProduct);

// DELETE
route.delete("/review/:id", deleteReviewController);

export const ReviewRoutes = route;
