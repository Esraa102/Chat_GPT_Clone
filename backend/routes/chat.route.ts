import express, { Router } from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { chatValidator, validate } from "../utils/validators.js";
import {
  generateChat,
  getAllChats,
  deleteAllChats,
} from "../controllers/chat.controller.js";

const router = express.Router();

//Private Route
router.post("/new", validate(chatValidator), verifyToken, generateChat);
router.get("/all-chats", verifyToken, getAllChats);
router.delete("/delete-chats", verifyToken, deleteAllChats);

export { router as chatRouter };
