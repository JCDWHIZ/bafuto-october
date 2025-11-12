import express from "express";
import { connectDB } from "./config/db";
import { syncModels } from "./models";
import { sendTestMail } from "./config/email";
// import dotenv from "dotenv"
// dotenv.config()
const userRoutes = require("./routes/user");
const recipieRoutes = require("./routes/recipe");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const port = process.env.PORT || "";
const app = express();

app.use(express.json());
connectDB();
syncModels();
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} - ${req.url} - ${req.body}`
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/recipie", recipieRoutes);
app.use("/api/auth", authRoutes);
// sendTestMail();
app.listen(port, () => {
  console.log("server is running at " + port);
});
