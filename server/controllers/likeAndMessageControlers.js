const { Post, Comment } = require("../models/postsSchema");

// Like a post by ID
const likePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes += 1;
    const updatedPost = await post.save();

    res.status(200).json({ updatedPost, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a comment to a post by ID
const addCommentToPost = async (req, res) => {
  const postId = req.params.id;
  const { userName, commentText } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = new Comment({ userName, commentText });
    post.comments.push(newComment);

    const updatedPost = await post.save();

    res.status(200).json({ updatedPost, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a comment from a post by Comment ID
const deleteCommentFromPost = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    post.comments.splice(commentIndex, 1);
    const updatedPost = await post.save();

    res.status(200).json({ updatedPost, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  likePostById,
  addCommentToPost,
  deleteCommentFromPost,
};
