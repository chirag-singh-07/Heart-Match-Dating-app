import express from "express";
import {
  handleCheckAuth,
  handleCreateUser,
  handleLogin,
  handleLogout,
} from "../controllers/authController.js";
import jwtCheck from "../middlewares/jwtCheck.js";


const router = express.Router();

router.get("/check-auth", jwtCheck, handleCheckAuth);

router.post("/register", handleCreateUser);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

export default router;
