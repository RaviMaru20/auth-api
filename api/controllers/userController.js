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
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({ _id: user._id, name: user.name, email: user.email });
});

// @desc: Update user profile
// @route: PUT /api/users/profile
// @access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    const { name, email, password } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    console.log(updatedUser);
    generateToken(res, updatedUser._id);
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
    return;
  }
  res.status(200).json({ message: "upadate user profile", success: true });
});
const resetPassword = asyncHandler(async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(200).json({ user: user, message: "Reset link sent" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export {
  login,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
};
