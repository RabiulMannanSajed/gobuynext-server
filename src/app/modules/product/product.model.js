import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },

  productType: {
    type: String,
  },

  // new added
  productWeight: {
    type: String,
  },
  productWeightUnit: {
    type: String,
    enum: ["kg", "g"],
  },

  productOfficialBrand: {
    type: String,
  },

  productCategory: {
    type: String,
  },
  //  this is work as sub Category
  productBrand: {
    type: String,
  },
  productSubBrand: {
    type: String,
  },

  productImage: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: String,
    required: true,
    trim: true,
  },

  //  new field added
  // ! Work on this

  discountPrice: {
    type: String,
  },

  productMultipleImages: [
    {
      type: String,
    },
  ],

  productDescription: {
    type: String,
  },

  productWarranty: {
    type: String,
  },

  productReturnPolicy: {
    type: String,
  },

  productDetails: [
    {
      sectionTitle: {
        type: String, // Example: "Basic Information"
        required: true,
      },

      fields: [
        {
          label: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],

  // ⭐ RATING SYSTEM
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  // ✅ NEW FIELD
  productCode: {
    type: String,
    unique: true,
    index: true,
  },
  sku: {
    type: String,
    unique: true,
    index: true,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
});
ProductSchema.pre("save", function (next) {
  // -------------------------
  // PRODUCT CODE (for URL)
  // -------------------------
  if (!this.productCode) {
    const nameSlug = this.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const mongoIdPart = this._id.toString().slice(-6);

    this.productCode = `${nameSlug}-${mongoIdPart}`;
  }

  // -------------------------
  // SKU (for inventory)
  // -------------------------
  if (!this.sku) {
    const category = this.productCategory
      ? this.productCategory.slice(0, 3).toUpperCase()
      : "PRD";

    const brand = this.productBrand
      ? this.productBrand.slice(0, 3).toUpperCase()
      : "BRD";

    const idPart = this._id.toString().slice(-5).toUpperCase();

    this.sku = `${category}-${brand}-${idPart}`;
  }

  next();
});

export const Product = model("Product", ProductSchema);
