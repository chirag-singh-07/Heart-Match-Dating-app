import cloudinary from "../config/cloudinaryConfig.js";
import User from "../models/userModel.js";
import { sendResponse } from "../utils/index.js";
import { comparePasswords, hashPassword } from "../utils/password.js";
import { generateTokenAndSend } from "../utils/token.js";

export const handleCreateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      bio,
      gender,
      preferredGender,
      location,
      birthdate,
      profileImage,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !bio ||
      !gender ||
      !preferredGender ||
      !location
    ) {
      return sendResponse(res, false, 400, "All fields are required");
    }

    if (password.length < 6) {
      return sendResponse(
        res,
        false,
        400,
        "Password must be at least 6 characters long"
      );
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return sendResponse(res, false, 400, "Invalid email format");
    }

    // Validate birthdate
    const birthDateObj = new Date(birthdate);
    if (
      isNaN(birthDateObj.getTime()) ||
      birthDateObj > new Date() ||
      new Date().getFullYear() - birthDateObj.getFullYear() < 18
    ) {
      return sendResponse(
        res,
        false,
        400,
        "Invalid birthdate or must be at least 18 years old"
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, false, 400, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    // Upload profile image to Cloudinary if file exists

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImage,
      bio,
      gender,
      preferredGender,
      location,
      birthdate: birthDateObj,
    });

    await newUser.save();

    // Generate JWT token
    generateTokenAndSend(newUser._id, res);

    return sendResponse(res, true, 201, "User created successfully", {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profileImage: newUser.profileImage,
      bio: newUser.bio,
      gender: newUser.gender,
      preferredGender: newUser.preferredGender,
      location: newUser.location,
      birthdate: newUser.birthdate,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};

export const handleCheckAuth = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return sendResponse(res, false, 401, "Unauthorized - no user id found ");
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return sendResponse(res, false, 401, "Unauthorized - user is not found ");
    }

    return sendResponse(res, true, 200, "User is authenticated", user);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, false, 400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return sendResponse(res, false, 400, "Invalid credentials");
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return sendResponse(res, false, 400, "Invalid credentials");
    }

    // Generate JWT token
    generateTokenAndSend(user._id, res);

    return sendResponse(res, true, 200, "Logged in successfully", user);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};

export const handleLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return sendResponse(res, true, 200, "Logged out successfully");
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, 500, "Internal Server Error");
  }
};
