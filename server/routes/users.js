const express = require('express');
const UsersController = require('../controllers/usersController');
const { body } = require('express-validator');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router
  .route('/') // User is created in the auth route, not here
  .get(isAuth, UsersController.getAllUsers)
  .patch(
    body('id').exists(),
    body('username').optional().isLength({ min: 4, max: 78 }),
    body('password').optional().isLength({ min: 8, max: 32 }),
    body('firstName').optional().isLength({ min: 2, max: 32 }),
    body('lastName').optional().isLength({ min: 2, max: 32 }),
    body('birthDate').optional().isDate(),
    body('bio').optional(),
    UsersController.updateUser
  )
  .delete(body('id').exists(), UsersController.deleteUser);

router.route('/:userId').get(isAuth, UsersController.getUserById);

module.exports = router;
