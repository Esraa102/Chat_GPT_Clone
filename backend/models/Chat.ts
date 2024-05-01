import mongoose from "mongoose";

export interface ChatDocument {
  role: String;
  content: String;
  createdAt?: Date;
  updatedAt?: Date;
  _doc?: any;
}
export const chatSchema = new mongoose.Schema<ChatDocument>({
  role: {
    type: String,
    required: true,
    enum: ["user", "system"],
  },
  content: {
    type: String,
    required: true,
  },
});
