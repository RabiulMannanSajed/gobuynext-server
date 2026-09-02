import { model, Schema } from "mongoose";

const BrandCategorySchema = new Schema(
  {
    productOfficialBrand: {
      type: String,
      trim: true,
    },

    productCategory: {
      type: String,
      required: true,
      trim: true,
    },

    // Products assigned to this category
    productId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ], // Works as Sub Category
    productBrand: {
      type: String,
      trim: true,
    },

    productSubBrand: {
      type: String,
      trim: true,
      default: "",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const BrandCategory = model("BrandCategory", BrandCategorySchema);
