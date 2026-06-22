import { model, Schema } from "mongoose";

const UserLeadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserLead = model("UserLead", UserLeadSchema);
