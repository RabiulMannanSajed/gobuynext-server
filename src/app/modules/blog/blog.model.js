import { model, Schema } from "mongoose";

const BlogSchema = new Schema({
  blogDetails: {
    type: String,
  },
});

export const Blog = model("blog", BlogSchema);
