import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
// import generateToken from "../utils/generateToken.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // check if user if verified
  if (!user.isVerified) {
    return res.send({
      message: "User Not Verified or Suspended",
      success: false,
    });
  }
  const token = generateToken(user._id);
  if (user && (await user.matchPassword(password))) {
    res.send({
      message: "User Login Success",
      data: token,
      success: true,
    });
  } else {
    res.send({
      message: "Invalid Email or Password",
      success: false,
    });
  }
  //   res.send({ email, password });
});
const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.send({ message: "User Exist!!!", data: null, success: false });
  }

  const user = new User(req.body);
  await user.save();
  res.send({ message: "User Created Successfully", data: null, success: true });
});
const userInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  user.password = "";
  res.send({ message: "User Fetched", data: user, success: true });
});
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find();

  res.send({ message: "Users Fetched", data: user, success: true });
});
const updateStatus = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.findByIdAndUpdate(req.body.selectedUser, {
    isVerified: req.body.isVerified,
  });

  res.send({
    message: req.body.isVerified ? "User Verified" : "User Suspended",
    data: null,
    success: true,
  });
});

export { registerUser, userAuth, userInfo, getUsers, updateStatus };
