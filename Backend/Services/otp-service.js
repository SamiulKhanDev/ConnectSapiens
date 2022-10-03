const crypto = require("crypto");
const { hashService } = require("./hash-service");

const smsSid = process.env.SMS_SID; //provided by the twillo
const smsAuthToken = process.env.SMS_AUTH_TOKEN; //provided by the twillo
const twilio = require("twilio")(smsSid, smsAuthToken, { lazyLoading: true }); //creating twillo object to send otp. Otps wil only be send to thoes numbers that are added(testing package) in the twillo account.
class OtpService {
  async generateOtp() {
    //Node has a crypto module that we will use to create the 4digit otp.
    //crypto.randomInt(lowerrange,upperrange) will generate random number between that range.

    const otp = await crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    await twilio.messages.create({
      //creating the sms that will be send.
      to: phone,
      from: process.env.SMS_FROM_NUMBER, //provided by twillo
      body: `You registration OTP for ConnectSapiens is ${otp}`,
    });
  }
  verifyOtp(data, hash) {
    const computedHash = hashService.hashOtp(data); //regerating the hash from the given data.
    return computedHash === hash; //if provided otp is valid.
  }
}

module.exports = { otpService: new OtpService() };
