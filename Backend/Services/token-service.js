const jwt = require("jsonwebtoken");
const refreshToken = require("../Models/refresh-model");
class TokenService {
  //token service takes care of creating tokens using json web tokens.
  generateTokens(payload) {
    //to generate tokens we need a package called json web tokens
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SCERET, {
      expiresIn: "1h",
    });
    //creating access token that will last for 1h.
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SCERET,
      {
        expiresIn: "1y",
      }
    );
    //creating refresh token that will last for 1 year.

    //IMPORTANT- you need two diff SECRETS , one for access token, other for refresh token.

    return { accessToken, refreshToken };
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
module.exports = { tokenService: new TokenService() };
