import { NextFunction, Response, Request } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.js";
import { COOKIE_NAME } from "../utils/constants.js";

interface GetUserRequest extends Request {
  user?: Record<string, any>;
}
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
        if (newUser) {
          const accessToken = createToken(newUser);
          const { password: encyrptedPass, ...rest } = newUser._doc;
          res
            .status(201)
            .cookie(COOKIE_NAME, accessToken, {
              path: "/",
              httpOnly: true,
              maxAge: 86400000 * 7, // 7 days,
            })
            .json({ status: "OK", userData: rest });
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
        // create  access token
        const accessToken = createToken(isAuthorized);
        const { password: encyrptedPass, ...rest } = isAuthorized._doc;
        res
          .status(200)
          .cookie(COOKIE_NAME, accessToken, {
            path: "/",
            httpOnly: true,
            maxAge: 86400000 * 7, // 7 days,
          })
          .json({ status: "OK", userData: rest });
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

const getUser = async (
  req: GetUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return res.status(200).json({ status: "OK", userData: req.user });
  } else {
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong:(" });
  }
};

const logOut = async (
  req: GetUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return res
      .clearCookie(COOKIE_NAME, {
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .json({ status: "OK", message: "User Logged Out Successfully" });
  } else {
    return res.status(401).json({
      status: "Error",
      message: "Your session has been expired, you need to log in first",
    });
  }
};

export { registerUser, logInUser, getUser, logOut };
