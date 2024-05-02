import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { connectToDB } from "./config/connectToDB.js";
import { authRouter } from "./routes/auth.route.js";
import { chatRouter } from "./routes/chat.route.js";
const app = express();

const __dirname = path.resolve();
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
app.use(express.static(path.join(__dirname, "/dist/frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
// Routess
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chats", chatRouter);

app.listen(port, () => {
  console.log(`Server Is Running On ${port}`);
});
