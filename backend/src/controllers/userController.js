// import cloudinary from "../config/cloudinaryConfig.js";
import User from "../models/userModel.js";
import { sendResponse } from "../utils/index.js";

// import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import mongoose from "mongoose";
import { io } from "../lib/socket.js";

export const getAllProfiles = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return sendResponse(res, false, 401, "Unauthorized - no user id found ");
    }

    // Find all users except the logged-in user
    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    return sendResponse(res, true, 200, "All profiles", allUsers);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};

export const getProfilesBaseOnGender = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return sendResponse(res, false, 401, "Unauthorized - no user ID found");
    }

    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, false, 404, "User not found with this user ID");
    }
    let genderQuery = [];
    switch (user.preferredGender) {
      case "men":
        genderQuery = ["male"];
        break;
      case "women":
        genderQuery = ["female"];
        break;
      case "Everyone":
      case "any":
        genderQuery = ["male", "female", "non-binary", "other"];
        break;
      default:
        return sendResponse(res, false, 400, "Invalid preferred gender");
    }

    // Find profiles based on gender preferences, excluding the current user
    const profiles = await User.find({
      _id: { $ne: userId },
      gender: { $in: genderQuery },
    }).select("-password");

    // console.log("Fetched profiles:", profiles);

    if (!profiles.length) {
      return sendResponse(res, true, 200, "No profiles found", []);
    }

    return sendResponse(
      res,
      true,
      200,
      "Profiles based on preferred gender",
      profiles
    );
  } catch (error) {
    console.error(
      "Error fetching profiles based on preferred gender:",
      error.message
    );
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};
export const likeUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { profileId } = req.body;

    if (!userId) {
      return sendResponse(res, false, 401, "Unauthorized - no user id found");
    }

    if (!profileId) {
      return sendResponse(res, false, 400, "Profile ID is required");
    }

    if (userId === profileId) {
      return sendResponse(res, false, 400, "You cannot like yourself");
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(profileId);

    if (!user || !targetUser) {
      return sendResponse(res, false, 404, "User not found");
    }

    // ✅ Prevent duplicate likes
    if (user.likes.includes(profileId)) {
      return sendResponse(res, false, 400, "User already liked this profile");
    }

    // ✅ Add like
    user.likes.push(profileId);
    await user.save();

    // ✅ Add notification to the target user
    targetUser.notifications.unshift({
      type: "like",
      sender: userId,
      message: `${user.name} liked your profile!`,
    });

    await targetUser.save();

    // ✅ Emit real-time notification
    io.to(targetUser._id.toString()).emit("new_notification", {
      type: "like",
      sender: {
        id: user._id,
        name: user.name,
        profileImage: user.profileImage,
      },
      message: ` liked your profile!`,
    });

    return sendResponse(
      res,
      true,
      200,
      "User liked profile and notification sent"
    );
  } catch (error) {
    console.error("Error liking user profile:", error);
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return sendResponse(res, false, 401, "Unauthorized");
    }

    const user = await User.findById(userId)
      .populate("notifications.sender", "name profileImage")
      .sort({ "notifications.createdAt": -1 });

    if (!user) {
      return sendResponse(res, false, 404, "User not found");
    }

    return sendResponse(
      res,
      true,
      200,
      "Notifications fetched",
      user.notifications
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, profileImage, bio, gender, location, birthdate, interests } =
      req.body;

    if (!userId) {
      return sendResponse(res, false, 401, "Unauthorized");
    }

    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, false, 404, "User not found");
    }

    // ✅ Only update fields if the value is provided (to avoid overwriting with empty strings)
    if (name?.trim()) user.name = name;
    if (profileImage?.trim()) user.profileImage = profileImage;
    if (bio?.trim()) user.bio = bio;
    if (gender) user.gender = gender;
    if (location?.trim()) user.location = location;
    if (birthdate) user.birthdate = birthdate;
    if (interests?.length) user.interests = interests;

    await user.save();

    return sendResponse(res, true, 200, "Profile updated successfully", user);
  } catch (error) {
    console.error("Error updating profile:", error);
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const userId = req.userId;

    const users = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: new mongoose.Types.ObjectId(userId) },
            { receiverId: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", new mongoose.Types.ObjectId(userId)] },
              "$receiverId",
              "$senderId",
            ],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: "$userDetails._id",
          name: "$userDetails.name",
          profileImage: "$userDetails.profileImage",
        },
      },
    ]);

    return sendResponse(res, true, 200, "Users retrieved", users);
  } catch (error) {
    console.error("❌ Error in getChatUsers:", error);
    return sendResponse(res, false, 500, "Failed to fetch users");
  }
};
