import express from "express";
import { auth } from "../middleware/auth.js";
import {
  generateArticle,
  generateTitle,
  generateImage,
  removeBackground,
  removeObject,
  resumeReview,
} from "../controllers/aiController.js";
import upload from "../middleware/upload.js";

const aiRoute = express.Router();
aiRoute.post("/generate-article", auth, generateArticle);
aiRoute.post("/generate-title", auth, generateTitle);
aiRoute.post("/generate-image", auth, generateImage);
aiRoute.post(
  "/remove-background",
  upload.single("image"),
  auth,
  removeBackground
);
aiRoute.post("/remove-object", upload.single("image"), auth, removeObject);
aiRoute.post("/resume-review", upload.single("resume"), auth, resumeReview);

export default aiRoute;
