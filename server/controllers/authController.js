const AuthService = require('../services/authService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');

class AuthController {
  // @desc Register new user
  // @route POST /auth/registration
  // @access Private
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation failed', errors.array()));
      }

      const { email, password, firstName, lastName, birthDate } = req.body;

      const userData = await AuthService.register(
        email,
        password,
        firstName,
        lastName,
        birthDate
      );

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  }

  // @desc Login user
  // @route POST /auth/login
  // @access Private
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Missing credentials', errors.array()));
      }

      const { email, password } = req.body;
      const userData = await AuthService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  // @desc Logout user
  // @route POST /auth/logout
  // @access Private
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await AuthService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  // @desc Refresh token
  // @route POST /auth/refresh
  // @access Private
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  // @desc Activate user account
  // @route POST /auth/activate/:link
  // @access Private
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await AuthService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
