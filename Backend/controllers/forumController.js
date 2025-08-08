const Forum = require("../models/Forum");

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Forum.find()
  .populate("createdBy", "name email")
  .populate("comments.user", "name email")
  .lean();

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error while fetching posts." });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { post } = req.body;

    if (!post || typeof post !== "string" || post.trim() === "") {
      return res.status(400).json({ error: "Post content is required." });
    }

    const newPost = await Forum.create({
      post,
      createdBy: req.user._id, // assuming req.user is set by auth middleware
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Server error while creating post." });
  }
};
// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "Comment text is required." });
    }

    const forum = await Forum.findById(id);
    if (!forum) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Add comment
    forum.comments.push({
      user: req.user._id,
      text,
      createdAt: new Date(),
    });

    await forum.save();

    //  Populate user name for comment and post
    const updatedPost = await Forum.findById(id)
      .populate("createdBy", "name")
      .populate("comments.user", "name");

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Server error while adding comment." });
  }
};

exports.editComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  const post = await Forum.findById(postId);
  const comment = post.comments.id(commentId);

  if (comment.user.toString() !== userId.toString()) {
    return res.status(403).json({ error: "Not authorized" });
  }

  comment.text = text;
  await post.save();

  const updated = await Forum.findById(postId)
    .populate("createdBy", "name")
    .populate("comments.user", "name _id");

  res.status(200).json(updated);
};


exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user._id;

    const post = await Forum.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (!comment.user || comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    post.comments.pull(commentId); // safer than comment.remove()
    await post.save(); //  wait for save to complete

    const updatedPost = await Forum.findById(postId)
      .populate("createdBy", "name")
      .populate("comments.user", "name _id");

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("🔥 Delete Comment Error:", err); 
    res.status(500).json({ error: "Server error while deleting comment" });
  }
};








