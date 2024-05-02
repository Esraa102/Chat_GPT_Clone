import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { configureOpenAI } from "../config/openAIConfig.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

interface ChatRequest extends Request {
  user?: Record<string, any>;
}
export const generateChat = async (
  req: ChatRequest,
  res: Response,
  next: NextFunction
) => {
  const { messageContent } = req.body;
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(401).json({
        status: "Error",
        message: "User Is Unathorized or your session expired",
      });
    } else {
      //STEP 1 => grab the chats user
      const chats = user.chats.map(({ role, content }) => ({
        role,
        content,
      })) as ChatCompletionMessageParam[];
      chats.push({ content: messageContent, role: "user" });
      user.chats.push({ content: messageContent, role: "user" });

      //STEP 2 => send all chats with the new message to the api
      const config = configureOpenAI();
      const openai = new OpenAI({
        apiKey: config.apiKey,
        organization: config.organization,
      });
      const chatResponse = await openai.chat.completions.create({
        messages: chats,
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
      });
      user.chats.push(chatResponse.choices[0].message);
      await user.save();
      console.log(chatResponse.choices[0].message);

      //STEP 3 => get the latest response
      return res.status(200).json({ status: "OK", chats: user.chats });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const getAllChats = async (
  req: ChatRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        status: "Error",
        message: "User Is Unathorized or your session expired",
      });
    } else {
      return res.status(200).json({ status: "OK", chats: user.chats });
    }
  } catch (error) {
    return res.status(500).json({ status: "Error", message: error.message });
  }
};

export const deleteAllChats = async (
  req: ChatRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        status: "Error",
        message: "User Is Unathorized or your session expired",
      });
    } else {
      user.chats = [];
      await user.save();
      return res.status(200).json({
        status: "OK",
        message: "Chats have been deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
