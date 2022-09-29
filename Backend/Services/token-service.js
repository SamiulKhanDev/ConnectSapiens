const jwt = require("jsonwebtoken");
class TokenService {
  generateTokens(payload) {
    //to generate tokens we need a package called json web tokens
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SCERET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SCERET,
      {
        expiresIn: "1y",
      }
    );

    return { accessToken, refreshToken };
  }
}
module.exports = { tokenService: new TokenService() };
