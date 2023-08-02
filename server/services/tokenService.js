const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m'
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '30d'
    });

    return {
      accessToken,
      refreshToken
    };
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenInfo = await Token.findOne({ user: userId });
    if (tokenInfo) {
      tokenInfo.refreshToken = refreshToken;
      await tokenInfo.save();
      return;
    }

    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeRefreshToken(refreshToken) {
    const token = await Token.deleteOne({ refreshToken });
    return token;
  }

  validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findRefreshToken(refreshToken) {
    const token = await Token.findOne({ refreshToken });
    return token;
  }
}

module.exports = new TokenService();
