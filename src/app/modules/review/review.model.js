import { model, Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// 🔥 prevent duplicate review (1 user = 1 review per product)
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

export const Review = model("Review", ReviewSchema);
