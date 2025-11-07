import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
// import dotenv from "dotenv"
// dotenv.config()
const userRoutes = require("./routes/user");
const recipieRoutes = require("./routes/recipe");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const port = process.env.PORT || "";
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} - ${req.url} - ${req.body}`
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/recipie", recipieRoutes);
app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log("server is running at " + port);
});
