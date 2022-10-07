const jwt = require("jsonwebtoken");
const refreshToken = require("../Models/refresh-model");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SCERET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SCERET;
class TokenService {
  //token service takes care of creating tokens using json web tokens.
  generateTokens(payload) {
    //to generate tokens we need a package called json web tokens
    // console.log(
    //   process.env.JWT_ACCESS_TOKEN_SCERET,
    //   " acc secret insode generate otp"
    // );
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    //creating access token that will last for 1h.
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    //creating refresh token that will last for 1 year.

    //IMPORTANT- you need two diff SECRETS , one for access token, other for refresh token.

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, accessTokenSecret);
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshToken.create({
        token: token,
        userId: userId,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
const tokenService = new TokenService();
module.exports = { tokenService: tokenService };
