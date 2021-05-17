import { Document, Schema } from "mongoose";

export default interface ISessionStore extends Document {
  refreshToken: string;
  userId: Schema.Types.ObjectId;
  expiryDate: Date;
}
