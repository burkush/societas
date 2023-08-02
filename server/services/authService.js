const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const generateUsername = require('../utils/generateUsername');
const User = require('../models/User');
const MailService = require('./mailService');
const TokenService = require('./tokenService');
const UserDto = require('../dtos/userDTO');
const ApiError = require('../exceptions/apiError');

class AuthService {
  // Register

  async register(email, password, firstName, lastName, birthDate) {
    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate) {
      throw ApiError.BadRequest(`User with '${email}' email already exists`);
    }

    const username = generateUsername(firstName, lastName);
    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid();

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate,
      activationLink
    });

    const payload = new UserDto(newUser);
    const tokens = TokenService.generateTokens({ ...payload });
    await TokenService.saveRefreshToken(payload.id, tokens.refreshToken);

    await MailService.sendActivationLink(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );

    return {
      ...tokens,
      user: payload
    };
  }

  // Login

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('User does not exist');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw ApiError.BadRequest('Incorrect email or password');
    }

    const payload = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...payload });
    await TokenService.saveRefreshToken(payload.id, tokens.refreshToken);

    return {
      ...tokens,
      user: payload
    };
  }

  // Logout

  async logout(refreshToken) {
    const token = await TokenService.removeRefreshToken(refreshToken);
    return token;
  }

  // Refresh token

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const foundToken = await TokenService.findRefreshToken(refreshToken);

    if (!userData || !foundToken) {
      throw ApiError.Unauthorized();
    }

    const user = await User.findById(userData.id);
    const payload = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...payload });
    await TokenService.saveRefreshToken(payload.id, tokens.refreshToken);

    return {
      ...tokens,
      user: payload
    };
  }

  // Activate accout

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Invalid activation link');
    }
    user.isActivated = true;
    await user.save();
  }
}

module.exports = new AuthService();
