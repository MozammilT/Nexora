import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";

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
