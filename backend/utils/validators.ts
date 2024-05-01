import { ValidationChain, body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      return res.status(422).json({ status: "Error", message: errors.array() });
    }
  };
};

export const logInValidator = [
  body("email").trim().isEmail().withMessage("Please Enter Valid Email"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage(
      "Password should contain at least 8 characters and can't be greater than 20 characters"
    ),
];

export const registerValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  ...logInValidator,
];

export const chatValidator = [
  body("messageContent")
    .notEmpty()
    .isLength({ min: 2, max: 10000 })
    .withMessage("Message Is Required"),
];
