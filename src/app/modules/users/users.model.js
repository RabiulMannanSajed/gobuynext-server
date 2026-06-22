import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  address: {
    type: String,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["admin", "rider", "customer"],
    default: "customer",
  },

  isDelete: {
    type: Boolean,
    default: false,
  },
});

export const User = model("User", UserSchema);
