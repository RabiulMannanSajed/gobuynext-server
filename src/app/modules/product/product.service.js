import { Product } from "./product.model.js";

export const createProductIntoDB = async (payload) => {
  const {
    productName,
    productImage,
    price,
    productMultipleImages,
    productDetails,
    productCategory,
    productBrand,
    productSubBrand,

    productReturnPolicy,
    productDescription,
    productType,
    productWeight,
    productWeightUnit,
    productOfficialBrand,
  } = payload;

  // 🔎 Basic Validation
  if (!productName || !productImage || !price) {
    throw new Error("Product name, image and price are required");
  }

  const productData = {
    productName,
    productImage,
    price,
    productMultipleImages: productMultipleImages || [],
    productDetails: productDetails || [],

    // ✅ ADD THESE
    productCategory,
    productBrand,
    productSubBrand,
    productType,
    productWeight,
    productWeightUnit,
    productOfficialBrand,
    productReturnPolicy,
    productDescription,
    ratings: [],
    averageRating: 0,
    totalRatings: 0,
    isDeleted: false,
  };
  console.log(productData);
  const result = await Product.create(productData);

  return result;
};

export const updateProductIntoDB = async (id, payload) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  // Update only fields user sends
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true, // return updated document
      runValidators: true,
    },
  );

  return updatedProduct;
};

export const addRatingIntoDB = async (productId, userId, rating) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const existingRating = product.ratings.find(
    (r) => r.user.toString() === userId,
  );

  if (existingRating) {
    // Update rating
    existingRating.rating = rating;
  } else {
    product.ratings.push({ user: userId, rating });
  }

  product.totalRatings = product.ratings.length;

  const totalSum = product.ratings.reduce((sum, item) => sum + item.rating, 0);

  product.averageRating = totalSum / product.totalRatings;

  await product.save();

  return {
    averageRating: product.averageRating,
    totalRatings: product.totalRatings,
  };
};

export const getAllProductsFromDB = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const skip = (page - 1) * limit;

  const filter = {
    isDeleted: false,
  };

  // ✅ Category
  if (query.category) {
    filter.productCategory = query.category;
  }

  // ✅ Sub Category (you named it productBrand before)
  if (query.subCategory) {
    filter.productBrand = query.subCategory;
  }

  // ✅ Sub Sub Category (NEW)
  if (query.subBrand) {
    filter.productSubBrand = query.subBrand;
  }

  // ❗ (Optional old support)
  if (query.brand) {
    filter.productBrand = query.brand;
  }

  // 🔍 Search
  if (query.search) {
    filter.productName = {
      $regex: query.search,
      $options: "i",
    };
  }

  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: products,
  };
};

export const getProductByIdFromDB = async (id) => {
  const product = await Product.findById(id);

  return product;
};

export const getProductByCodeFromDB = async (productCode) => {
  const product = await Product.findOne({
    productCode,
  });

  return product;
};

export const getAllDeletedProductsFromDB = async () => {
  const result = await Product.find({ isDeleted: true });
  return result;
};

// Soft delete
export const softDeleteProductFromDB = async (id) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

// rESTORE  data
export const restoreDeleteProductFromDB = async (id) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: false },
    { new: true },
  );

  return result;
};

export const getProductMenuFromDB = async () => {
  const products = await Product.find({ isDeleted: false });

  const categoryMap = {};

  products.forEach((product) => {
    const category = product.productCategory;
    const subCategory = product.productBrand;
    const subSubCategory = product.productSubBrand;

    // Level 1: Category
    if (!categoryMap[category]) {
      categoryMap[category] = {};
    }

    // Level 2: SubCategory (Fan, Headphone)
    if (!categoryMap[category][subCategory]) {
      categoryMap[category][subCategory] = new Set();
    }

    // Level 3: SubSubCategory (Electric Fan, AC Fan)
    categoryMap[category][subCategory].add(subSubCategory);
  });

  // Convert to array
  const menuItems = Object.keys(categoryMap).map((category) => ({
    title: category,
    children: Object.keys(categoryMap[category]).map((subCategory) => ({
      title: subCategory,
      children: [...categoryMap[category][subCategory]].map((subSub) => ({
        title: subSub,
      })),
    })),
  }));

  return menuItems;
};
