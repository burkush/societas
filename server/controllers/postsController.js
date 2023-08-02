const PostsService = require('../services/postsService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');

class PostsController {
  // @desc Get all posts
  // @route GET /posts
  // @access Private
  async getAllPosts(req, res, next) {
    try {
      const posts = await PostsService.getAllPosts();

      if (!posts) {
        return res.json({ message: 'No posts found' });
      }

      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  // @desc Create new post
  // @route POST /posts
  // @access Private
  async createPost(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Missing post information', errors.array())
        );
      }

      const { user, title, content } = req.body;
      const newPost = await PostsService.createPost(user, title, content);

      return res
        .status(201)
        .json({ message: `New post '${newPost.title}' created` });
    } catch (error) {
      next(error);
    }
  }

  // @desc Update post
  // @route PATCH /posts
  // @access Private
  async updatePost(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Missing post id', errors.array()));
      }

      const { id, title, content, starred } = req.body;

      const updatedPost = await PostsService.updatePost(
        id,
        title,
        content,
        starred
      );

      res.json({ message: `Post '${updatedPost.title}' updated` });
    } catch (error) {
      next(error);
    }
  }

  // @desc Delete post
  // @route DELETE /posts
  // @access Private
  async deletePost(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Missing post id', errors.array()));
      }

      const { id } = req.body;

      const deletedPost = await PostsService.deletePost(id);
      res.json({ message: `Post ${deletedPost._id} deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostsController();
