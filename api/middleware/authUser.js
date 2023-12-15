import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import e from "express";

const authenticateUser = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.access_token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.userId).select("-password");
  if (req.user) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { authenticateUser };
