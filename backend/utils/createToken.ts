import jwt from "jsonwebtoken";
import { ChatDocument } from "../models/Chat";
import mongoose from "mongoose";

export const createToken = (user: {
  _id: mongoose.Types.ObjectId;
  username: String;
  email: String;
  chats: Array<ChatDocument>;
  _doc?: any;
}) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      chats: user.chats,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return accessToken;
};
