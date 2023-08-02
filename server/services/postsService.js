const Post = require('../models/Post');
const User = require('../models/User');
const ApiError = require('../exceptions/apiError');

class PostsService {
  // Get all posts from the database

  async getAllPosts() {
    const posts = await Post.find().lean();

    if (!posts?.length) {
      return null;
    }

    const postsWithUserInfo = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.user).lean().exec();
        return {
          ...post,
          username: user.username,
          userFirstName: user.firstName,
          userLastName: user.lastName
        };
      })
    );

    return postsWithUserInfo;
  }

  // Create post

  async createPost(user, title, content) {
    const newPost = await Post.create({ user, title, content });
    return newPost;
  }

  // Update post

  async updatePost(id, title, content, starred) {
    const post = await Post.findById(id).exec();

    if (!post) {
      throw ApiError.BadRequest('Post not found');
    }

    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    if (starred) {
      post.starred = starred;
    }

    const updatedPost = await post.save();
    return updatedPost;
  }

  // Delete post

  async deletePost(id) {
    const post = await Post.findById(id).exec();
    if (!post) {
      throw ApiError.BadRequest('Post not found');
    }

    const deletedPost = await post.deleteOne();
    return deletedPost;
  }
}

module.exports = new PostsService();
