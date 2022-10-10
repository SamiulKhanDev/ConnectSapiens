const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../Models/refresh-model");
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
      expiresIn: "1m",
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
    return await refreshTokenModel.create({
      token: token,
      userId: userId,
    });
  }
  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }
  async findRefreshToken(userId, refreshToken) {
    return await refreshTokenModel.findOne({ userId, token: refreshToken });
  }
  async updateRefreshToken(uerrId, refreshToken) {
    return await refreshTokenModel.updateOne(
      { userId },
      { token: refreshToken }
    );
  }
}
const tokenService = new TokenService();
module.exports = { tokenService: tokenService };
