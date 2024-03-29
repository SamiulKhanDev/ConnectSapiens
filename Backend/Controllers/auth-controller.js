const { otpService } = require("../Services/otp-service"); //service to genearate, send by sms and verify otp
const { hashService } = require("../Services/hash-service"); //service to hash the otp.
const { userService } = require("../Services/user-service"); //service to create user, or to find user if already present in the database
const { tokenService } = require("../Services/token-service"); //to generate JWT token to provide access.
class AuthController {
  async sendOtp(req, res) {
    // console.log(req.body);
    const { identifier, type } = req.body; //getting the phone number where we have to send the otp

    if (!identifier) {
      return res.status(400).json({ error: "phone or email is required" }); //if phone number is not provided.
    }
    const otp = await otpService.generateOtp(); //if phone is provided generate otp.

    const ttl = 1000 * 60 * 2; //this otp will be valid only for 2 min; time to live .
    const expires = Date.now() + ttl; //calculating the expiry time by adding "ttl" with the current time.
    const data = `${identifier}.${otp}.${expires}`; //expires field is required to see if the otp is still time valid or not,and also it will make sure no one can manupulate the time field.[part 5 18:13min]
    const hashOtp = hashService.hashOtp(data); // creating a hash of the data.

    try {
      if (type === "Phone") {
        await otpService.sendBySms(identifier, otp); //now sending the otp in the given number.
      } else {
        await otpService.sendByEmail(identifier, otp); //now sending the otp in the given email
      }

      res.json({
        hash: `${hashOtp}.${expires}`,
        otp: otp,
        identifier: identifier,
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async verifyOtp(req, res) {
    // const { refreshToken: refreshTokenCookie } = req.cookies;
    // console.log(refreshTokenCookie);
    const { identifier, hash, otp } = req.body; //we need all this three fields to regenaate the hash,and compare with the exsisting hashcode
    if (!identifier || !hash || !otp) {
      return res.status(400).json({ error: "please provide all the values" }); //if any one of them is missing.
    }

    const [hashedOtp, expires] = hash.split("."); //getting the expirey time.
    if (Date.now() > parseInt(expires)) {
      //checking if the otp is still valid or not.
      //as expires will be a string we have to convert it in a number
      return res.status(400).json({ error: "Otp hash been expired" });
    }

    const data = `${identifier}.${otp}.${expires}`; //recreating the value from which the original hash was created
    const isValid = otpService.verifyOtp(data, hashedOtp); //valideting the otp.
    if (!isValid) {
      return res.status(400).json({ error: "Otp is not valid" });
    }
    //as all is valid, now time create a new user
    let user;
    try {
      user = await userService.findUser({ identifier }); //trying to find if the user is already in the db.
      if (!user) {
        user = await userService.createUser({ identifier }); //if it's a new user then only create new user in db.
      }
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ error: error });
    }

    //token

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id, //now when we will verify access token using jwt.verify if all matches the playload object will be returned.
      activated: false,
    });
    /*
    now we will store the accesstoken  and the refreshToken in cookie
    cookie = A cookie is a piece of data from a website that is stored within a web browser that the website can retrieve at a later time.
    frontend js will not be able to read cookie
    localstorage vs cookies = Cookies are intended to be read by the server, whereas localStorage can only be read by the browser. Thus, cookies are restricted to small data volumes, while localStorage can store more data.
    Web applications most commonly need to utilize and store two types of tokens
    Access tokens, which are short-lived JWT tokens signed by the server and included in every HTTP request that a browser makes to a web server, in order to authorize the request
    Refresh tokens, which are lasting, opaque strings stored in the application database and used to acquire new access tokens when they expire
*/
    await tokenService.storeRefreshToken(refreshToken, user._id);
    res.cookie("refreshToken", refreshToken, {
      //sending the refresh token inside a cookie.
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //only the server will be able to read ,
    });
    res.cookie("accessToken", accessToken, {
      //sending the refresh token inside a cookie.
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //only the server will be able to read ,
    });
    return res.json({ user, auth: true }); // sending the user as responce.
  }

  async refresh(req, res) {
    //get the token from cookies.
    const { refreshToken: refreshTokenCookie } = req.cookies;
    // console.log(refreshTokenCookie);
    // console.log(req);
    let userDetails;
    try {
      //verify the token.
      userDetails = await tokenService.verifyRefreshToken(refreshTokenCookie);
    } catch (error) {
      return res.status(401).json({ error: " invalid token 101" });
    }
    //check if the token is inside db.
    // console.log(userDetails);
    try {
      const token = await tokenService.findRefreshToken(
        userDetails._id,
        refreshTokenCookie
      );
      if (!token) {
        return res.status(401).json({ error: " invalid token 111" });
      }
    } catch (error) {
      return res.status(500).json({ error: " line 116" });
    }

    // check if valid user
    const user = await userService.findUser({ _id: userDetails._id });
    if (!user) {
      return res.status(404).json({ error: " No user 122" });
    }

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    //update refresh token.

    try {
      await tokenService.updateRefreshToken(userDetails._id, refreshToken);
    } catch (error) {
      return res.status(500).json({ error: " line 135" });
    }
    //put in cookie
    res.cookie("refreshToken", refreshToken, {
      //sending the refresh token inside a cookie.
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //only the server will be able to read ,
    });
    res.cookie("accessToken", accessToken, {
      //sending the refresh token inside a cookie.
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //only the server will be able to read ,
    });
    return res.json({ user, auth: true });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;

    await tokenService.removeToken(refreshToken);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ user: null, auth: false });
  }
}
const authController = new AuthController();
module.exports = { authController: authController };
