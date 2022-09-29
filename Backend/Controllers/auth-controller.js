const { otpService } = require("../Services/otp-service");
const { hashService } = require("../Services/hash-service");
const { userService } = require("../Services/user-service");
const { tokenService } = require("../Services/token-service");
class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ error: "phone number is required" });
    }
    const otp = await otpService.generateOtp();

    const ttl = 1000 * 60 * 2; //this otp will be valid only for 2 min;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hashOtp = hashService.hashOtp(data);

    try {
      await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hashOtp}.${expires}`,
        phone: phone,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async verifyOtp(req, res) {
    const { phone, hash, otp } = req.body; //we need all this three to regenaate the hash,and compare with the exsisting hashcode
    if (!phone || !hash || !otp) {
      res.status(400).json({ error: "please provide all the values" });
      return;
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > parseInt(expires)) {
      //as expires will be a string we have to convert it in a number
      res.status(400).json({ error: "Otp hash been expired" });
      return;
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(data, hashedOtp);
    if (!isValid) {
      res.status(400).json({ error: "Otp is not valid" });
      return;
    }
    //as all is valid, now time create a new user

    let user;

    try {
      user = await userService.findUser({ phone: phone });
      if (!user) {
        user = await userService.createUser({ phone: phone });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
      return;
    }

    //token

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });
    /*
    now we will store the accesstoken in local storage, and the refreshToken we will store in cookie
    cookie = A cookie is a piece of data from a website that is stored within a web browser that the website can retrieve at a later time.
    frontend js will not be able to read cookie
    localstorage vs cookies = Cookies are intended to be read by the server, whereas localStorage can only be read by the browser. Thus, cookies are restricted to small data volumes, while localStorage can store more data.
    Web applications most commonly need to utilize and store two types of tokens
    Access tokens, which are short-lived JWT tokens signed by the server and included in every HTTP request that a browser makes to a web server, in order to authorize the request
    Refresh tokens, which are lasting, opaque strings stored in the application database and used to acquire new access tokens when they expire
*/
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //only the server will be able to read ,
    });
    res.json({ accessToken: accessToken });
  }
}

module.exports = { authController: new AuthController() };
