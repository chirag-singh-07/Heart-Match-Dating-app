import express from "express";
import jwtCheck from "../middlewares/jwtCheck.js";
import {
  getAllProfiles,
  getNotifications,
  getProfilesBaseOnGender,
  getUserConversations,
  likeUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all-profiles", jwtCheck, getAllProfiles);
router.get("/gender-profiles", jwtCheck, getProfilesBaseOnGender);
router.post("/like", jwtCheck, likeUserProfile);
router.post("/notifications", jwtCheck, getNotifications);
router.post("/update-profile", jwtCheck, updateUserProfile);
router.get("/get-sidebar-users", jwtCheck, getUserConversations);

export default router;
