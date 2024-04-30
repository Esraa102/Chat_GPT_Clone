import { NextFunction, Response, Request } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from "../utils/createToken.js";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ status: "Error", message: "User Is Already Exist" });
      } else {
        const hasedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
          username,
          email,
          password: hasedPassword,
        });
        // create access token
        createToken(newUser, res, 201);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "Error", message: error.message });
    }
  } else {
    return res
      .status(400)
      .json({ status: "Error", message: "Please Provide All Fields" });
  }
};

const logInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const isAuthorized = await User.findOne({ email });
    if (!isAuthorized) {
      return res
        .status(401)
        .json({ status: "Error", message: "User Is Unathorized" });
    } else {
      if (bcrypt.compareSync(password, isAuthorized.password.toString())) {
        // create  access token
        createToken(isAuthorized, res, 200);
      } else {
        return res
          .status(400)
          .json({ status: "Error", message: "Wrong Credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error", message: error.message });
  }
};

export { registerUser, logInUser };
