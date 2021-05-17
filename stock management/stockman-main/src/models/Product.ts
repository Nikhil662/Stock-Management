import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const ProductSchema: Schema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
