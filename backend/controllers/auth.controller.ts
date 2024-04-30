import { NextFunction, Response, Request } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.js";
import { COOKIE_NAME } from "../utils/constants.js";

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
        // clear previous token
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          signed: true,
          path: "/",
        });
        // create access token
        if (newUser) {
          createToken(newUser, res, 201);
        }
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
        // clear previous token
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          signed: true,
          path: "/",
        });
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
