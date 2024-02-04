const Friendship = require("../models/friendSchema");
const { Post } = require("../models/postsSchema");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { user, content, title } = req.body;
    const newPost = new Post({ user, content, title });
    const savedPost = await newPost.save();
    res.status(200).json({
      data: savedPost,
      message: "post created successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userfriend = await Friendship.findOne({ user_id: userId });
    if (userfriend?.friends && userfriend?.friends.length > 0) {
      let friendsIdArray = userfriend?.friends.map((friend) => {
        if (friend.status === "accept") {
          return friend.user;
        } else {
          return;
        }
      });
      const posts = await Post.find({ user: { $in: [...friendsIdArray] } })
        .populate("user")
        .populate("comments.user");
      res.status(200).json({
        data: posts,
        status: 200,
        length: posts.length,
        message: "Success",
      });
    } else {
      res.status(200).json({
        data: [],
        status: 200,
        message: "Sorry, you don't have any friends yet.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};

// comment and like
const commentsAndLikes = async (req, res) => {
  try {
    const { user, type, postId } = req.body;

    const post = await Post.findById(postId);

    // const userId = req.user.id;

    if (type === "comment") {
      const { comment } = req.body;
      post.comments.push({ user, comment });
    } else if (type === "like") {
      let liked = null;
      let newIdsArray = [];
      if (post?.idsArray && post?.idsArray?.length > 0) {
        for (let id of post.idsArray) {
          if (`${id}` === user) {
            liked = id;
          } else {
            newIdsArray.push(id);
          }
        }
        if (liked) {
          post.idsArray = newIdsArray;
          post.likes -= 1;
        } else {
          post.idsArray.push(user);
          post.likes += 1;
        }
      } else {
        post.idsArray.push(user);
        post.likes += 1;
      }
    } else {
      return res.status(400).json({ error: "Invalid type" });
    }

    const updatedPost = await post.save();
    res.status(200).json({
      data: updatedPost,
      message: "type succesfully updated",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  commentsAndLikes,
};
