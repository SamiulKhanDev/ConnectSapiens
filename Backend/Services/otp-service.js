const crypto = require("crypto");
const { hashService } = require("./hash-service");

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(smsSid, smsAuthToken, { lazyLoading: true });
class OtpService {
  async generateOtp() {
    //Node has a crypto module that we will use to create the 4digit otp.
    //crypto.randomInt(lowerrange,upperrange) will generate random number between that range.

    const otp = await crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `You registration OTP for ConnectSapiens is ${otp}`,
    });
  }
  verifyOtp(data, hash) {
    const computedHash = hashService.hashOtp(data);
    return computedHash === hash;
  }
}

module.exports = { otpService: new OtpService() };
