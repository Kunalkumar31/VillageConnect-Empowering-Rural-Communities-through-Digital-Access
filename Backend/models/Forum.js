const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const forumSchema = new mongoose.Schema({
  post: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Forum", forumSchema);
