import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  console.log("[generateArticle] Function called");
  console.log("[generateArticle] Request body: ", req.body);

  // Get userId from the auth middleware
  const userId = req.userId;
  console.log("[generateArticle] userId from middleware:", userId);

  if (!userId) {
    console.error(
      "[generateArticle] No userId found - auth middleware may have failed"
    );
    return res.status(400).json({
      success: false,
      message: "User ID not available",
    });
  }

  const { prompt, length } = req.body;
  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt is required",
    });
  }
  console.log("[generateArticle] Prompt:", prompt, "Length:", length);

  const plan = req.plan;
  const free_usage = req.free_usage;
  console.log("[generateArticle] Plan:", plan, "Free usage:", free_usage);

  try {
    if (plan !== "premium" && free_usage >= 10) {
      console.log(
        "[generateArticle] Free plan limit reached for user:",
        userId
      );
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue",
      });
    }

    console.log("[generateArticle] Making AI API call...");
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });
    console.log("[generateArticle] AI API response received");
    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      console.error("[generateArticle] No content received from AI");
      return res.status(500).json({
        success: false,
        message: "No content generated",
      });
    }
    // Save to database with safety check
    let dbInsertSuccess = false;
    try {
      await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${content}, 'article')`;
      dbInsertSuccess = true;
      console.log("[generateArticle] Content successfully inserted into DB");
    } catch (dbErr) {
      dbInsertSuccess = false;
      console.error(
        "[generateArticle] Failed to insert content into DB:",
        dbErr
      );
    }

    if (plan !== "premium") {
      console.log(
        "[generateArticle] Updating free usage count for user:",
        userId
      );
      try {
        await clerkClient.users.updateUserMetadata(userId, {
          privateMetadata: {
            free_usage: free_usage + 1,
          },
        });
        console.log("[generateArticle] Usage count updated successfully");
      } catch (updateErr) {
        console.error(
          "[generateArticle] Failed to update usage count:",
          updateErr
        );
      }
    }
    console.log("[generateArticle] Sending successful response");
    res.json({
      success: true,
      content,
      dbInsertSuccess,
      usage: {
        plan,
        remaining:
          plan === "premium" ? "unlimited" : Math.max(0, 10 - (free_usage + 1)),
      },
    });
  } catch (err) {
    console.error("[generateArticle] Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate article",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const generateTitle = async (req, res) => {
  console.log("[generateTitle] Function called");
  console.log("[generateTitle] Request body: ", req.body);

  // Get userId from the auth middleware
  const userId = req.userId;
  console.log("[generateTitle] userId from middleware:", userId);

  if (!userId) {
    console.error(
      "[generateTitle] No userId found - auth middleware may have failed"
    );
    return res.status(400).json({
      success: false,
      message: "User ID not available",
    });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt is required",
    });
  }
  console.log("[generateTitle] Prompt:", prompt);

  const plan = req.plan;
  const free_usage = req.free_usage;
  console.log("[generateTitle] Plan:", plan, "Free usage:", free_usage);

  try {
    if (plan !== "premium" && free_usage >= 10) {
      console.log("[generateTitle] Free plan limit reached for user:", userId);
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue",
      });
    }

    console.log("[generateTitle] Making AI API call...");
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });
    console.log("[generateTitle] AI API response received");
    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      console.error("[generateTitle] No content received from AI");
      return res.status(500).json({
        success: false,
        message: "No content generated",
      });
    }
    // Save to database with safety check
    let dbInsertSuccess = false;
    try {
      await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${content}, 'blog-title')`;
      dbInsertSuccess = true;
      console.log("[generateTitle] Content successfully inserted into DB");
    } catch (dbErr) {
      dbInsertSuccess = false;
      console.error("[generateTitle] Failed to insert content into DB:", dbErr);
    }

    if (plan !== "premium") {
      console.log(
        "[generateTitle] Updating free usage count for user:",
        userId
      );
      try {
        await clerkClient.users.updateUserMetadata(userId, {
          privateMetadata: {
            free_usage: free_usage + 1,
          },
        });
        console.log("[generateTitle] Usage count updated successfully");
      } catch (updateErr) {
        console.error(
          "[generateTitle] Failed to update usage count:",
          updateErr
        );
      }
    }
    console.log("[generateTitle] Sending successful response");
    res.json({
      success: true,
      content,
      dbInsertSuccess,
      usage: {
        plan,
        remaining:
          plan === "premium" ? "unlimited" : Math.max(0, 10 - (free_usage + 1)),
      },
    });
  } catch (err) {
    console.error("[generateTitle] Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate article",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const generateImage = async (req, res) => {
  console.log("[generateImage] Function called");
  console.log("[generateImage] Request body: ", req.body);

  // Get userId from the auth middleware
  const userId = req.userId;
  console.log("[generateImage] userId from middleware:", userId);

  if (!userId) {
    console.error(
      "[generateImage] No userId found - auth middleware may have failed"
    );
    return res.status(400).json({
      success: false,
      message: "User ID not available",
    });
  }

  const { prompt, publish, style } = req.body;
  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt is required",
    });
  }
  console.log("[generateImage] Prompt:", prompt);

  const fullPrompt = `${prompt} in ${style} style`;
  console.log("[generateImage] Full prompt: ", fullPrompt);

  const plan = req.plan;
  console.log("[generateImage] Plan:", plan);

  try {
    if (plan !== "premium") {
      console.log("[generateImage] This feature is only for premium users");
      return res.json({
        success: false,
        message: "This feature is only for premium users. Upgrade to continue",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );
    console.log(
      "[generateImage] Received image data from ClipDrop, size:",
      data.length
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    // console.log("Image from Clipdrop: ", base64Image);

    if (!base64Image) {
      console.error("[generateImage] No content received from AI");
      return res.status(500).json({
        success: false,
        message: "No content generated",
      });
    }

    // Upload image to Cloudinary
    console.log("[generateImage] Uploading image to Cloudinary...");
    const response = await cloudinary.uploader.upload(base64Image, {
      resource_type: "image",
    });
    console.log(
      "[generateImage] Image uploaded successfully:",
      response.secure_url
    );
    const imageURL = response.secure_url;

    // Save to database with safety check
    let dbInsertSuccess = false;
    try {
      await sql`INSERT INTO creations (user_id, prompt, content, type, publish) VALUES(${userId}, ${prompt}, ${imageURL}, 'image', ${
        publish ?? false
      })`;
      dbInsertSuccess = true;
      console.log("[generateImage] Content successfully inserted into DB");
    } catch (dbErr) {
      dbInsertSuccess = false;
      console.error("[generateImage] Failed to insert content into DB:", dbErr);
    }

    console.log("[generateImage] Sending successful response");
    res.json({
      success: true,
      content: imageURL,
      dbInsertSuccess,
    });
  } catch (err) {
    console.error("[generateImage] Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate article",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const removeBackground = async (req, res) => {
  console.log("[removeBackground] Function called");
  console.log("[removeBackground] Request body: ", req.body);

  // Get userId from the auth middleware
  const userId = req.userId;
  console.log("[removeBackground] userId from middleware:", userId);

  if (!userId) {
    console.error(
      "[removeBackground] No userId found - auth middleware may have failed"
    );
    return res.status(400).json({
      success: false,
      message: "User ID not available",
    });
  }

  const image = req.file;
  if (!image) {
    console.log("[removeBackground] Image is required.");
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });
  }
  console.log("[removeBackground] Image:", image);

  const plan = req.plan;
  console.log("[removeBackground] Plan:", plan);

  try {
    if (plan !== "premium") {
      console.log("[removeBackground] This feature is only for premium users");
      return res.json({
        success: false,
        message: "This feature is only for premium users. Upgrade to continue",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      // effects: "background_removal",
      background_removal: "cloudinary_ai",
    });

    // Save to database with safety check
    let dbInsertSuccess = false;
    try {
      await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, 'Remove backgroud from the image', ${secure_url}, 'image')`;
      dbInsertSuccess = true;
      console.log("[removeBackground] Content successfully inserted into DB");
    } catch (dbErr) {
      dbInsertSuccess = false;
      console.error(
        "[removeBackground] Failed to insert content into DB:",
        dbErr
      );
    }

    console.log("[removeBackground] Sending successful response");
    res.json({
      success: true,
      content: secure_url,
      dbInsertSuccess,
    });
  } catch (err) {
    console.error("[removeBackground] Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate article",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const removeObject = async (req, res) => {
  console.log("[removeObject] Function called");
  console.log("[removeObject] Request body: ", req.body);

  if (!req.file) {
    console.log("[removeObject] No file uploaded");
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  // Get userId from the auth middleware
  const { object } = req.body;
  console.log("Object received from body:", object);

  const userId = req.userId;
  console.log("[removeObject] userId from middleware:", userId);

  if (!userId) {
    console.error(
      "[removeObject] No userId found - auth middleware may have failed"
    );
    return res.status(400).json({
      success: false,
      message: "User ID not available",
    });
  }

  const plan = req.plan;
  console.log("[removeObject] Plan:", plan);

  try {
    if (plan !== "premium") {
      console.log("[removeObject] This feature is only for premium users");
      return res.json({
        success: false,
        message: "This feature is only for premium users. Upgrade to continue",
      });
    }

    const image = req.file;
    console.log("[removeObject] REQ.FILE:", req.file);

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const transformedUrl = cloudinary.url(public_id, {
      effect: `gen_remove:prompt_${object}`,
    });

    console.log(
      "[removeObject] Image received after editing: ",
      transformedUrl
    );

    // Save to database with safety check
    // let dbInsertSuccess = false;
    // try {
    //   await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, 'Remove ${object} from the image', ${imageUrl}, 'image')`;
    //   dbInsertSuccess = true;
    //   console.log("[removeObject] Content successfully inserted into DB");
    // } catch (dbErr) {
    //   dbInsertSuccess = false;
    //   console.error("[removeObject] Failed to insert content into DB:", dbErr);
    // }

    console.log("[removeObject] Sending successful response");
    res.json({
      success: true,
      content: transformedUrl,
      // dbInsertSuccess,
    });
  } catch (err) {
    console.error("[removeObject] Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate article",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const resumeReview = async (req, res) => {
  console.log("[resumeReview] Function called");
  console.log("[resumeReview] Request body: ", req.body);

  // Get userId from the auth middleware

  const resume = req.file;
  const userId = req.userId;
  console.log("[resumeReview] userId from middleware:", userId);

  if (!userId) {
    console.error(
      "[resumeReview] No userId found - auth middleware may have failed"
    );
    return res.status(400).json({
      success: false,
      message: "User ID not available",
    });
  }

  const plan = req.plan;
  console.log("[resumeReview] Plan:", plan);

  try {
    if (plan !== "premium") {
      console.log("[resumeReview] This feature is only for premium users");
      return res.json({
        success: false,
        message: "This feature is only for premium users. Upgrade to continue",
      });
    }

    if (resume.size > 10 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File size exceeds allowed size of 10MB",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement and also give it a ATS score. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log("[generateArticle] AI API response received");
    const content = response.choices?.[0]?.message?.content;

    // Save to database with safety check
    let dbInsertSuccess = false;
    try {
      await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;
      dbInsertSuccess = true;
      console.log("[resumeReview] Content successfully inserted into DB");
    } catch (dbErr) {
      dbInsertSuccess = false;
      console.error("[resumeReview] Failed to insert content into DB:", dbErr);
    }

    console.log("[resumeReview] Sending successful response");
    res.json({
      success: true,
      content,
      dbInsertSuccess,
    });
  } catch (err) {
    console.error("[resumeReview] Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate article",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
