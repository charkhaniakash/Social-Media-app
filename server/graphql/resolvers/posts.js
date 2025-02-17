const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");
const redis = require("../../redis-client");

module.exports = {
  Query: {
    async getPosts() {
      const redisKey = 'posts';
      try {
        const cachedPosts = await redis.get(redisKey);
        
        if (cachedPosts) {
          console.log("caching")
          const parsedPosts = JSON.parse(cachedPosts);
          
          // Validate and filter out posts with invalid comment data
          const validatedPosts = parsedPosts.map(post => {
            if (!post) return null;
            
            // Ensure comments are valid (have required fields)
            if (post.comments && Array.isArray(post.comments)) {
              post.comments = post.comments.filter(comment => 
                comment && comment.id && comment.createdAt && comment.body && comment.username
              );
            }
            
            return post;
          });
          
          return validatedPosts;
        }
        
        const posts = await Post.find().sort({ _id: -1 });
        console.log("I am not caching")
        await redis.set(redisKey, JSON.stringify(posts) );
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        console.log("postpost" , post)
        if (post) {
          return post;
        } else {
          throw new Error("Could not find post");
        }
      } catch (error) {}
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      await redis.set(`post:${post._id}`, JSON.stringify(post) , 'EX' , 3600);
      await redis.del('posts');


      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.deleteOne();

          await redis.del(`post:${postId}`);
          await redis.del('posts');

          return "Post deleted successfully";
        } else {
          throw new AuthenticationError(
            "You don't have the permission to delete this post"
          );
        }
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },

    async likePost(_, {postId}, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt:new Date().toISOString(),
          });
        }
        await post.save();
        await redis.set(`post:${postId}`, JSON.stringify(post) , 'EX' , 3600);
        await redis.del('posts');

        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
