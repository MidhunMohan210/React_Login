import express from "express";
const router = express.Router();
import { multerUploadUserProfile } from "../config/multerConfig.js";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserprofile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect,getUserprofile).put(multerUploadUserProfile.single('profileImageName'),protect,updateUserProfile);

export default router;
