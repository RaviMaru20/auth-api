import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc: Auth user
// @route: POST /api/users/auth
// @access: Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.verifyPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password.");
  }
});

// @desc: Auth user
// @route: POST /api/users/register
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @desc: Auth user
// @route: POST /api/users/logout
// @access: Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout user", success: true });
});

// @desc: get user profile
// @route: POST /api/users/profile
// @access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get User Profile", success: true });
});

// @desc: Update user profile
// @route: PUT /api/users/profile
// @access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "upadate user profile", success: true });
});

export { login, registerUser, logoutUser, getUserProfile, updateUserProfile };
