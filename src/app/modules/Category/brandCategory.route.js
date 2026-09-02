import { Router } from "express";
import {
  createBrandCategory,
  deleteBrandCategory,
  getAllBrandCategories,
  getBrandCategoryById,
  updateBrandCategory,
} from "./brandCategory.controller.js";

const route = Router();

// Create
route.post("/create-Category", createBrandCategory);

// Get all
route.get("/get-all-Category", getAllBrandCategories);

// Get by ID
route.get("/get-Category/:id", getBrandCategoryById);

// Update
route.patch("/update-Category/:id", updateBrandCategory);

// Delete
route.delete("/delete-Category/:id", deleteBrandCategory);

export const brandCategoryRoute = route;
