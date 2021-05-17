import { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  userId: Schema.Types.ObjectId;
}
