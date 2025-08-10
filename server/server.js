import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import aiRoute from "./routes/aiRoutes.js";
import userRoute from "./routes/userRoutes.js";

connectCloudinary();

const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://nexora-saas-tau.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

// Debug middleware to check what clerkMiddleware sets up
app.use((req, res, next) => {
  console.log("[DEBUG MIDDLEWARE]");
  console.log(
    "[DEBUG MIDDLEWARE] Headers: ",
    req.headers.authorization ? "Bearer token present" : "No auth header"
  );

  if (typeof req.auth === "function") {
    try {
      const authResult = req.auth();
      console.log("req.auth() result:", authResult);
    } catch (err) {
      console.log("Error calling req.auth():", err.message);
    }
  }
  next();
});

//Routes
app.get("/", (_, res) => {
  res.send("Api is running");
});

app.use("/api/ai", requireAuth(), aiRoute);
app.use("/api/user", requireAuth(), userRoute);

//PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
