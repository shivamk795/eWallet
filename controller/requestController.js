import asyncHandler from "express-async-handler";
import Request from "../models/requestModel.js";
import User from "../models/userModel.js";
import Transactions from "../models/transactionsModel.js";

const getRequests = asyncHandler(async (req, res) => {
  try {
    console.log("hit");
    const requests = await Request.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .populate("sender")
      .populate("receiver");
    console.log(requests);
    res.send({
      message: "Request fetched successfully",
      data: requests,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Transaction Failed",
      data: err.message,
      success: false,
    });
  }
});
const sendRequests = asyncHandler(async (req, res) => {
  try {
    const { receiver, amount, description } = req.body;

    const request = new Request({
      sender: req.body.userId,
      receiver,
      amount,
      description,
    });
    await request.save();
    res.send({
      message: "Request send successfully",
      data: request,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Transaction Failed",
      data: err.message,
      success: false,
    });
  }
});
const updateStatus = asyncHandler(async (req, res) => {
  try {
    if (req.body.status === "accepted") {
      const newTransaction = new Transactions({
        sender: req.body.receiver._id,
        receiver: req.body.sender._id,
        amount: req.body.amount,
        reference: req.body.description,
        status: "success",
      });
      await newTransaction.save();
      await User.findByIdAndUpdate(req.body.sender._id, {
        $inc: { balance: req.body.amount },
      });
      await User.findByIdAndUpdate(req.body.receiver._id, {
        $inc: { balance: -req.body.amount },
      });
      await Request.findByIdAndUpdate(req.body._id, {
        status: req.body.status,
      });
    } else {
      await Request.findByIdAndUpdate(req.body._id, {
        status: req.body.status,
      });
    }

    res.send({
      message: "Request Status Updated successfully",
      data: null,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Request Status Update failed",
      data: err.message,
      success: false,
    });
  }
});

export { getRequests, sendRequests, updateStatus };
