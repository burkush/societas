const bcrypt = require('bcrypt');
const User = require('../models/User');
const ApiError = require('../exceptions/apiError');

class UserService {
  // Get all users from the database

  async getAllUsers() {
    const users = await User.find().select('-password').lean();

    if (!users?.length) {
      return null;
    }

    return users;
  }

  // Get specific user

  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return null;
    }

    return user;
  }

  // Update user

  async updateUser(
    id,
    username,
    password,
    firstName,
    lastName,
    birthDate,
    bio
  ) {
    const user = await User.findById(id).exec();
    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    if (username) {
      const duplicate = await User.findOne({ username }).lean().exec();
      if (duplicate && duplicate?._id.toString() !== id) {
        throw ApiError.Conflict('Duplicate username');
      }

      user.username = username;
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (birthDate) {
      user.birthDate = birthDate;
    }
    if (bio || bio === '') {
      user.bio = bio;
    }

    const updatedUser = await user.save();
    return updatedUser;
  }

  // Delete user

  async deleteUser(id) {
    const user = await User.findById(id).exec();
    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const deletedUser = await user.deleteOne();
    return deletedUser;
  }
}

module.exports = new UserService();
