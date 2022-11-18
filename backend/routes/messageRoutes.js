import express from "express";
import { sendMessage } from "../controllers/messageControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, sendMessage);
// router.route('/:chatId').get(protect,allMessages)

export default router;
