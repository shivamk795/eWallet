import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  userInfo,
  userAuth,
  getUsers,
  updateStatus,
} from "../controller/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userAuth);
router.post("/getuserinfo", protect, userInfo);
router.post("/getallusers", protect, getUsers);
router.post("/updateuserverifiedstatus", protect, updateStatus);

export default router;
