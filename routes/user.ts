import express from "express";
import {
  cancelSubscription,
  deleteAccount,
  getProfile,
  updateProfile,
  upgradeSubscription,
} from "../controllers/userController";
const router = express.Router();

router.route("/profile").put(updateProfile);
router.route("/profile").get(getProfile);
router.route("/subscription/upgrade").post(upgradeSubscription);
router.route("/subscription/cancel").post(cancelSubscription);
router.route("/account").delete(deleteAccount);

module.exports = router;
