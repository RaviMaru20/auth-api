import jwt from "jsonwebtoken";

const generateToken = (res, userId, expiresInSeconds = 3600) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: expiresInSeconds,
  });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: expiresInSeconds,
  });
};

export default generateToken;
