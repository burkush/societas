const express = require('express');
const AuthController = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/registration',
  body('email').exists().isEmail(),
  body('password').exists().isLength({ min: 8, max: 32 }),
  body('firstName').exists().isLength({ min: 2, max: 32 }),
  body('lastName').exists().isLength({ min: 2, max: 32 }),
  body('birthDate').exists().isDate(),
  AuthController.register
);

router.post(
  '/login',
  body('email').exists().isEmail(),
  body('password').exists(),
  AuthController.login
);

router.post('/logout', AuthController.logout);

router.get('/refresh', AuthController.refresh);

router.get('/activate/:link', AuthController.activate);

module.exports = router;
