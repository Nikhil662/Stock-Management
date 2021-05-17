import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

const CategorySchema: Schema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
