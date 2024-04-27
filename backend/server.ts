import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();

const port = process.env.PORT || 5001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Server Is Running On ${port}`);
});
