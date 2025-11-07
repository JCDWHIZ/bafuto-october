import express from "express";
import {
  createRecipie,
  getRecipie,
  getRecipies,
  recognizeImage,
  uploadIngredient,
} from "../controllers/recipeController";
const router = express.Router();

router.route("/").post(createRecipie);
router.route("/recognize").post(recognizeImage);
router.route("/").get(getRecipies);
router.route("/:id").get(getRecipie);
router.route("/ingredient").post(uploadIngredient);

module.exports = router;
