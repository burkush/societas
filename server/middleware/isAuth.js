const ApiError = require('../exceptions/apiError');
const TokenService = require('../services/tokenService');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.Unauthorized());
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.Unauthorized());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.Unauthorized());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.Unauthorized());
  }
};
