import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  console.log("[getUserCreations] Function called...");

  const { userId } = req.auth();

  try {
    const result = await sql`SELECT * FROM creations WHERE user_id = ${userId} 
      ORDER BY created_at DESC`;

    res.json({ success: true, result });
  } catch (err) {
    console.log("[getUserCreations] Error: ", err);
    res.json({ success: false, message: err.message });
  }
};

export const getPubishedCreations = async (req, res) => {
  console.log("[getPubishedCreations] Function called...");

  try {
    const result =
      await sql`SELECT * FROM creations WHERE PUBLISH = true ORDER BY created_at DESC`;

    res.json({ success: true, result });
  } catch (err) {
    console.log("[getPubishedCreations] Error: ", err);
    res.json({ success: false, message: err.message });
  }
};

export const toggleLikeCreation = async (req, res) => {
  console.log("[toggleLikeCreation] Function called...");

  const { userId } = req.auth();
  const { id } = req.body;

  try {
    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if (!creation) {
      console.log("[getPubishedCreations] Creation not found. Returning.");
      return res
        .status(404)
        .json({ success: false, message: "Creation not found" });
    }
    console.log("Data fetched from DB:", creation);

    const currentLikes = creation.likes;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      const updatedCreation =
        await sql`UPDATE creations SET likes = array_remove(likes, ${userIdStr}) WHERE id = ${id}`;
      message = "Creation Unliked";
      console.log("[getPubishedCreations] Creation Unliked:", updatedLikes);
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      const updatedCreation =
        await sql`UPDATE creations SET likes = array_append(likes, ${userIdStr}) WHERE id = ${id}`;
      message = "Creation Liked";
      console.log("[getPubishedCreations] Creation Liked:", updatedLikes);
    }

    res.json({
      success: true,
      creation,
      message,
      likesCount: updatedLikes.length,
    });
  } catch (err) {
    console.log("[getPubishedCreations] Error: ", err);
    res.json({ success: false, message: err.message });
  }
};
