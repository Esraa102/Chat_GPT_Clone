import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { registerValidator, validate } from "../utils/validators.js";

const router = express.Router();

router.post("/register", validate(registerValidator), registerUser);
export { router as authRouter };
