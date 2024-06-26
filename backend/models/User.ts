import mongoose from "mongoose";
import { ChatDocument, chatSchema } from "./Chat.js";

export interface UserDocument {
  username: String;
  email: String;
  password: String;
  chats: Array<ChatDocument>;
  imgProfile: String;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}
const userSchema = new mongoose.Schema<UserDocument>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imgProfile: {
    type: String,
  },
  chats: [chatSchema],
});

export const User = mongoose.model<UserDocument>("Users", userSchema);
