import jwt from "jsonwebtoken";
import { Response } from "express";
import { ChatDocument } from "../models/Chat";
import mongoose from "mongoose";

export const createToken = (
  user: {
    _id: mongoose.Types.ObjectId;
    username: String;
    email: String;
    password: String;
    chats: Array<ChatDocument>;
    createdAt: Date;
    updatedAt: Date;
    _doc?: any;
  },
  res: Response,
  statusCode: Number
) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      chats: user.chats,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  const { password: encyrptedPass, ...rest } = user._doc;
  return res
    .status(Number(statusCode))
    .cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 86400000 * 7, // 7 days,
    })
    .json({ status: "OK", userData: rest });
};
