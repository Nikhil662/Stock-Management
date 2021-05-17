import { Document } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  price: number;
  category: string;
  img?: string;
}
