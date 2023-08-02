const UserService = require('../services/userService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');

class UserController {
  // @desc Get all users
  // @route GET /users
  // @access Private
  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();

      if (!users) {
        return res.json({ message: 'No users found' });
      }

      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  // @desc Get user
  // @route GET /users/:userId
  // @access Private
  async getUserById(req, res, next) {
    const userId = req.params.userId;

    try {
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // @desc Update user
  // @route PATCH /users
  // @access Private
  async updateUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation failed', errors.array()));
      }

      const { id, username, password, firstName, lastName, birthDate, bio } =
        req.body;

      const updatedUser = await UserService.updateUser(
        id,
        username,
        password,
        firstName,
        lastName,
        birthDate,
        bio
      );

      res.json({ message: `User ${updatedUser.username} updated` });
    } catch (error) {
      next(error);
    }
  }

  // @desc Delete user
  // @route DELETE /users
  // @access Private
  async deleteUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Missing user id', errors.array()));
      }

      const { id } = req.body;
      const deletedUser = await UserService.deleteUser(id);
      res.json({ message: `User ${deletedUser._id} deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
