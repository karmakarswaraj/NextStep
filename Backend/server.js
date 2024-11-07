import express from "express";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
