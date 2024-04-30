import express from "express";
import { logInUser, registerUser } from "../controllers/auth.controller.js";
import {
  logInValidator,
  registerValidator,
  validate,
} from "../utils/validators.js";

const router = express.Router();

router.post("/register", validate(registerValidator), registerUser);
router.post("/login", validate(logInValidator), logInUser);
export { router as authRouter };
