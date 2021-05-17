import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema: Schema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true,
      length: 10,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
