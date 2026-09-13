import { Router } from "express";
import {
  addBannerImage,
  createBanner,
  deleteBanner,
  getAllBanners,
  getSingleBanner,
  removeBannerImage,
  removeBannerImageByIndex,
  updateBannerImages,
} from "./banner.controller.js";

const route = Router();

// Create user
route.post("/create-Banner", createBanner);

// Get all users
route.get("/get-all-Banner", getAllBanners);

// Get single user
route.get("/get-single-user/:id", getSingleBanner);

// Replace/update all images
route.patch("/update-banner-images/:id", updateBannerImages);

// Add one image
route.patch("/add-banner-image/:id", addBannerImage);

// Remove image by URL
route.patch("/remove-banner-image/:id", removeBannerImage);

// Remove image by index
route.delete("/remove-banner-image/:id/:index", removeBannerImageByIndex);

// Delete entire Banner
route.delete("/delete-banner/:id", deleteBanner);

export const bannerRoute = route;
