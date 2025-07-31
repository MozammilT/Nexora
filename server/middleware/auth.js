import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  console.log("[DEBUG][auth] Starting auth middleware");

  try {
    const authData = req.auth();
    console.log("[DEBUG][auth] authData returned:", authData);

    const { userId, has } = req.auth();
    if (!userId) {
      console.log("[DEBUG][auth] No userId found");
      return res.status(401).json({
        success: false,
        message: "User ID not found in authentication data",
      });
    }
    console.log("[DEBUG][auth] userId:", userId);
    console.log(
      "[DEBUG][auth] has function available:",
      typeof has === "function"
    );

    //Check for premium plan
    const hasPremiumPlan =
      typeof has === "function" ? await has({ plan: "premium" }) : false;
    console.log("[DEBUG][auth] hasPremiumPlan:", hasPremiumPlan);

    // Get user from Clerk
    const user = await clerkClient.users.getUser(userId);
    console.log("[DEBUG][auth] Retrieved user from Clerk");

    // Handle free usage
    const currentFreeUsage = user.privateMetadata?.free_usage || 0;

    if (!hasPremiumPlan) {
      console.log("[DEBUG][auth] Free usage found:", currentFreeUsage);
      req.free_usage = currentFreeUsage;
    } else {
      console.log("[DEBUG][auth] Premium user - resetting free_usage to 0");
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "premium" : "free";
    req.userId = userId;

    console.log("[DEBUG][auth] Auth middleware completed successfully");
    console.log(
      "[DEBUG][auth] Final values - plan:",
      req.plan,
      "free_usage:",
      req.free_usage
    );
    next();
  } catch (err) {
    console.error("[DEBUG][auth] Error in auth middleware:", err);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
      error: err.message,
    });
  }
};
