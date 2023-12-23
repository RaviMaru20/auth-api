import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

otpSchema.set("timestamps", true);

// Set expiry to 5 minutes after createdAt
otpSchema.virtual("expiry").get(function () {
  return new Date(this.createdAt.getTime() + 5 * 60 * 1000); // 5 minutes in milliseconds
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
