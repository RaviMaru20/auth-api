import express from "express";
import {
  login,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authUser.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/reset", resetPassword);
router.post("/logout", authenticateUser, logoutUser);
router.get("/profile", authenticateUser, getUserProfile);
router.put("/profile", authenticateUser, updateUserProfile);

export default router;
