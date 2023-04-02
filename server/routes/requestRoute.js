import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getRequests,
  sendRequests,
  updateStatus,
} from "../controller/requestController.js";

const router = express.Router();

router.post("/get-all-requests-by-user", protect, getRequests);
router.post("/send-request", protect, sendRequests);
router.post("/update-request-status", protect, updateStatus);

export default router;
