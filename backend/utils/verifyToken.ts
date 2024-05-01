import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants";

interface VerfiyRequest extends Request {
  user?: Record<string, any>;
}

export const verifyToken = async (
  req: VerfiyRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[`${COOKIE_NAME}`];

  if (!token) {
    return res.status(401).json({
      status: "Error",
      message: "Your Session has expired, you need to log in",
    });
  } else {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            status: "Error",
            message: "Invalid Token",
          });
        } else {
          req.user = decoded;
          next();
        }
      }
    );
  }
};
