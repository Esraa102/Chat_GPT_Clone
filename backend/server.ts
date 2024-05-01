import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/connectToDB.js";
import { authRouter } from "./routes/auth.route.js";
import { chatRouter } from "./routes/chat.route.js";
const app = express();

const port = process.env.PORT || 5001;
connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
// remove it in  production mode
app.use(morgan("dev"));

// Routess
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chats", chatRouter);

app.listen(port, () => {
  console.log(`Server Is Running On ${port}`);
});
