import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectToDB } from "./config/connectToDB.js";
import morgan from "morgan";
import { authRouter } from "./routes/auth.route.js";
import { chatRouter } from "./routes/chat.route.js";
const app = express();

const port = process.env.PORT || 5001;
connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
// remove it in the production mode
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chats", chatRouter);

app.listen(port, () => {
  console.log(`Server Is Running On ${port}`);
});
