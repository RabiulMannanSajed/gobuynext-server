import { model, Schema } from "mongoose";

const BannerSchema = new Schema(
  {
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (images) => images.length <= 3,
        message: "Maximum 3 images are allowed.",
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Banner = model("Banner", BannerSchema);
