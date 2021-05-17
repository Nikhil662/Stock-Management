import mongoose, { Schema } from "mongoose";
import ISessionStore from "../interfaces/session";

const SessionSchema: Schema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ISessionStore>("SessionStore", SessionSchema);
