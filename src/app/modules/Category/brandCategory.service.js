import { BrandCategory } from "./BrandCategorySchema.js";

export const createBrandCategoryIntoDB = async (payload) => {
  const {
    productOfficialBrand,
    productCategory,
    productBrand,
    productSubBrand,
  } = payload;

  // Check duplicate
  const existing = await BrandCategory.findOne({
    productOfficialBrand,
    productCategory,
    productBrand,
    productSubBrand: productSubBrand || "",
    isDeleted: false,
  });

  if (existing) {
    throw new Error("This brand category already exists");
  }

  const result = await BrandCategory.create({
    productOfficialBrand,
    productCategory,
    productBrand,
    productSubBrand: productSubBrand || "",
  });

  return result;
};

export const getAllBrandCategoriesFromDB = async (query = {}) => {
  const filter = {
    isDeleted: false,
  };

  if (query.productOfficialBrand) {
    filter.productOfficialBrand = query.productOfficialBrand;
  }

  if (query.productCategory) {
    filter.productCategory = query.productCategory;
  }

  if (query.productBrand) {
    filter.productBrand = query.productBrand;
  }

  const result = await BrandCategory.find(filter)
    .sort({ createdAt: -1 })
    .lean();

  return result;
};

export const getBrandCategoryByIdFromDB = async (id) => {
  const result = await BrandCategory.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!result) {
    throw new Error("Brand category not found");
  }

  return result;
};

export const updateBrandCategoryInDB = async (id, payload) => {
  const result = await BrandCategory.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: payload,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new Error("Brand category not found");
  }

  return result;
};

export const deleteBrandCategoryFromDB = async (id) => {
  const result = await BrandCategory.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    {
      new: true,
    },
  );

  if (!result) {
    throw new Error("Brand category not found");
  }

  return result;
};
