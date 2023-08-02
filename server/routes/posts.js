const express = require('express');
const PostsController = require('../controllers/postsController');
const { body } = require('express-validator');

const router = express.Router();

router
  .route('/')
  .get(PostsController.getAllPosts)
  .post(
    body('user').exists(),
    body('title').exists(),
    body('content').exists(),
    PostsController.createPost
  )
  .patch(body('id').exists(), PostsController.updatePost)
  .delete(body('id').exists(), PostsController.deletePost);

module.exports = router;
