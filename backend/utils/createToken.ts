import jwt from "jsonwebtoken";
import { Response } from "express";
import { ChatDocument } from "../models/Chat";
import mongoose from "mongoose";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (
  user: {
    _id: mongoose.Types.ObjectId;
    username: String;
    email: String;
    chats: Array<ChatDocument>;
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
    .cookie(COOKIE_NAME, accessToken, {
      path: "/",
      httpOnly: true,
      maxAge: 86400000 * 7, // 7 days,
      signed: true,
    })
    .json({ status: "OK", userData: rest });
};
