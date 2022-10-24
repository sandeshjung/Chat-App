import express from "express";
import dotenv from "dotenv";
import { chats } from "./data/data.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  res.send(chats.find((x) => x._id === req.params.id));
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
