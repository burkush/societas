const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    bio: {
      type: String,
      required: false
    },
    isActivated: {
      type: Boolean,
      default: false
    },
    activationLink: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
