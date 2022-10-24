import express, { Router } from "express";
const router = express.Router();
import authUser from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", authUser);

export default router;
