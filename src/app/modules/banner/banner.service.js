import { Banner } from "./banner.model.js";

/* ===============================
   CREATE
================================ */

export const createBannerIntoDB = async (payload) => {
  if (!Array.isArray(payload.images)) {
    throw new Error("Images must be an array.");
  }

  if (payload.images.length > 3) {
    throw new Error("Maximum 3 images are allowed.");
  }

  payload.images = [...new Set(payload.images)];

  return await Banner.create(payload);
};

/* ===============================
   GET ALL
================================ */

export const getAllBannerFromDB = async () => {
  return await Banner.find().sort({ createdAt: -1 }).lean();
};

/* ===============================
   GET SINGLE
================================ */

export const getSingleBannerFromDB = async (id) => {
  const banner = await Banner.findById(id).lean();

  if (!banner) {
    throw new Error("banner not found.");
  }

  return banner;
};

/* ===============================
   UPDATE ALL IMAGES
================================ */

export const updateBannerImagesIntoDB = async (id, images) => {
  if (!Array.isArray(images)) {
    throw new Error("Images must be an array.");
  }

  if (images.length > 3) {
    throw new Error("Maximum 3 images are allowed.");
  }

  const uniqueImages = [...new Set(images)];

  const banner = await Banner.findByIdAndUpdate(
    id,
    {
      images: uniqueImages,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!banner) {
    throw new Error("banner not found.");
  }

  return banner;
};

/* ===============================
   ADD IMAGE
================================ */

export const addBannerImageIntoDB = async (id, imageUrl) => {
  if (!imageUrl) {
    throw new Error("Image URL is required.");
  }

  const banner = await Banner.findById(id);

  if (!banner) {
    throw new Error("banner not found.");
  }

  if (banner.images.length >= 3) {
    throw new Error("Maximum 3 images are allowed.");
  }

  if (banner.images.includes(imageUrl)) {
    throw new Error("Image already exists.");
  }

  banner.images.push(imageUrl);

  await banner.save();

  return banner;
};

/* ===============================
   REMOVE IMAGE
================================ */

export const removeBannerImageFromDB = async (id, imageUrl) => {
  const Banner = await Banner.findById(id);

  if (!Banner) {
    throw new Error("Banner not found.");
  }

  Banner.images = Banner.images.filter((image) => image !== imageUrl);

  await Banner.save();

  return Banner;
};

/* ===============================
   REMOVE IMAGE BY INDEX
================================ */

export const removeBannerImageByIndexFromDB = async (id, index) => {
  const banner = await Banner.findById(id);

  if (!banner) {
    throw new Error("banner not found.");
  }

  const imageIndex = Number(index);

  if (
    Number.isNaN(imageIndex) ||
    imageIndex < 0 ||
    imageIndex >= banner.images.length
  ) {
    throw new Error("Invalid image index.");
  }

  banner.images.splice(imageIndex, 1);

  await banner.save();

  return banner;
};

/* ===============================
   DELETE USER
================================ */

export const deleteBannerFromDB = async (id) => {
  const banner = await Banner.findByIdAndDelete(id);

  if (!banner) {
    throw new Error("banner not found.");
  }

  return banner;
};
