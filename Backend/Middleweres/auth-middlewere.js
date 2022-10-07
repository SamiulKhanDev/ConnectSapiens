const { tokenService } = require("../Services/token-service");
const jwt = require("jsonwebtoken");
const validateAccesstoken = async (req, res, next) => {
  //so cookies are automaticcaly actheted to each and every req we send to server. So in this req also cokkie in which we have stored the access and refresh token will be acthed.
  //to get the access token from the cookie we need to install a package called cookie-parser. Set the cookie-parser in server.js
  try {
    const { accessToken } = req.cookies;
    // console.log("inside validateAccesstoken");
    if (!accessToken) {
      throw new Error();
      // console.log("access token missing");
    }
    const userData = await tokenService.verifyAccessToken(accessToken);
    // console.log(userData);
    if (!userData) {
      throw new Error();
    }
    req.user = userData; //attaching user field to req obj
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid access token" });
  }
};

module.exports = { validateAccesstoken };
