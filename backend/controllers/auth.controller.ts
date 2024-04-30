import { NextFunction, Response, Request } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

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
      .json({ status: "Error", message: "Please Provide All Inputs" });
  }
};

export { registerUser };
