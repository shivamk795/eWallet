import mongoose from "mongoose";
const transactionsSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reference: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    // transactionId: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Transactions = mongoose.model("Transactions", transactionsSchema);
export default Transactions;
