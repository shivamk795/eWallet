import asyncHandler from "express-async-handler";
import Transactions from "../models/transactionsModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
("../models/transactionsModel.js");

const transferFund = asyncHandler(async (req, res) => {
  try {
    const newTransaction = new Transactions(req.body);
    await newTransaction.save();

    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balance: -req.body.amount },
    });
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });
    res.send({
      message: "Transaction Successful",
      data: newTransaction,
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
const verifyAccount = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({ message: "Account Verified", data: user, success: true });
    } else {
      res.send({ message: "Account Not Found", data: null, success: false });
    }
  } catch (err) {
    res.send({
      message: "Transaction Failed",
      data: err.message,
      success: false,
    });
  }
});
const getAllTransactionsByUser = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transactions.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender")
      .populate("receiver");

    res.send({
      message: "Transaction fetched",
      data: transactions,
      success: true,
    });
  } catch (err) {
    res.send({
      message: "Transaction Fetch Operation Failed",
      data: err.message,
      success: false,
    });
  }
});

const depositFund = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    const { token, amount } = req.body;
    console.log("req.body.userId", req.body.userId);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "FastPay deposit transaction",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3001/transcations",
      cancel_url: "http://localhost:3001",
    });
    res.send({
      message: "Transaction Initiated successfully",
      data: session.url,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Transaction Failed",
      data: null,
      success: false,
    });
  }
});

const stripeComplete = asyncHandler(async (request, response) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    const sig = request.headers["stripe-signature"];
    let event;
    const endpointSecret = "whsec_bueKudxpqkoO3S0RXmlPJ9cY97NVJS4J";

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(err);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        const user = await User.findOne({
          email: checkoutSessionCompleted.customer_details.email,
        });
        const newTransaction = new Transactions({
          sender: user._id,
          receiver: user._id,
          amount: checkoutSessionCompleted.amount_total / 100,
          status: "success",
          type: "deposit",
          reference: "Stripe Deposit",
        });
        await newTransaction.save();
        await User.findByIdAndUpdate(user._id, {
          $inc: { balance: checkoutSessionCompleted.amount_total / 100 },
        });

        // console.log("checkoutSessionCompleted", checkoutSessionCompleted);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  } catch (err) {
    console.log(err);
  }
});

export {
  transferFund,
  verifyAccount,
  depositFund,
  getAllTransactionsByUser,
  stripeComplete,
};
