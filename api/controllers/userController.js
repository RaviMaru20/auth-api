import asyncHandler from "express-async-handler";

// @desc: Auth user
// @route: POST /api/users/auth
// @access: Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User", success: true });
});

// @desc: Auth user
// @route: POST /api/users/register
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Register User", success: true });
});
// @desc: Auth user
// @route: POST /api/users/logout
// @access: Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User", success: true });
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

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
