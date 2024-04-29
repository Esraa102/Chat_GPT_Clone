import mongoose from "mongoose";

export const chatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ["User", "Bot"],
  },
  content: {
    type: String,
    required: true,
  },
});
