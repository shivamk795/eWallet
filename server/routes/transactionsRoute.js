import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  transferFund,
  verifyAccount,
  getAllTransactionsByUser,
  depositFund,
  stripeComplete,
} from "../controller/transcationController.js";
const router = express.Router();

router.post("/transfer-fund", express.json(), protect, transferFund);
router.post("/verify-account", express.json(), protect, verifyAccount);
router.post(
  "/get-all-transactions-by-user",
  express.json(),
  protect,
  getAllTransactionsByUser
);
router.post("/deposit-funds", express.json(), protect, depositFund);
router.post(
  "/stripe-complete",
  express.raw({ type: "application/json" }),
  stripeComplete
);

export default router;
