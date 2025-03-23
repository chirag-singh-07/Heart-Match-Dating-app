import express from "express";
import { handleGetMessages, handleSendMessage } from "../controllers/messageController.js";
import jwtCheck from "../middlewares/jwtCheck.js";

const router = express.Router();

router.post("/send/:id", jwtCheck, handleSendMessage);
router.get("/:id",jwtCheck, handleGetMessages);

export default router;
