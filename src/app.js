import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./app/router/router.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/gobuynext", router);
//
const getController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gobuynext is running now",
  });
};

app.get("/", getController);

export default app;
