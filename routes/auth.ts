import express from "express";
import {
  forgotPassword,
  login,
  registerAccount,
  setPassword,
} from "../controllers/authController";
const router = express.Router();

router.route("/").post(login);
router.route("/register").post(registerAccount);
router.route("/set-password").put(setPassword);
router.route("/forgot-password").post(forgotPassword);

module.exports = router;
