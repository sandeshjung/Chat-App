import express, { Router } from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  allUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

export default router;
