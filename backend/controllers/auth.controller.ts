import { NextFunction, Response, Request } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    try {
      const user = await User.find({ email });
      if (user.length > 0) {
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
        const { password: encyrptedPass, ...rest } = newUser._doc;
        res.status(201).json({ status: "OK", userData: rest });
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
        const accessToken = jwt.sign(
          {
            _id: isAuthorized._id,
            username: isAuthorized.username,
            email: isAuthorized.email,
            password: isAuthorized.password,
            chats: isAuthorized.chats,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        const { password: encyrptedPass, ...rest } = isAuthorized._doc;
        return res
          .status(200)
          .cookie("access_token", accessToken, {
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

export { registerUser, logInUser };
