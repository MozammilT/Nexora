import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getUserCreations,
  getPubishedCreations,
  toggleLikeCreation,
} from "../controllers/userController.js";

const userRoute = express.Router();
userRoute.get("/user-creation", auth, getUserCreations);
userRoute.get("/published-creation", getPubishedCreations);
userRoute.post("/toggle-like", toggleLikeCreation);

export default userRoute;
