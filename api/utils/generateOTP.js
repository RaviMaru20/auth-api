// Desc: Generate a 6 digit OTP and return it with an expiry time of 5 minutes
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 5);
  const otpData = {
    otp: otp,
    expiry: expiry,
  };
  return otpData;
};

export default generateOTP;
