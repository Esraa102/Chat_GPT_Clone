import express from "express";
import {
  logInUser,
  registerUser,
  getUser,
  logOut,
} from "../controllers/auth.controller.js";
import {
  logInValidator,
  registerValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/register", validate(registerValidator), registerUser);
router.post("/login", validate(logInValidator), logInUser);
router.get("/auth-status", verifyToken, getUser);
router.get("/logout", verifyToken, logOut);

export { router as authRouter };
