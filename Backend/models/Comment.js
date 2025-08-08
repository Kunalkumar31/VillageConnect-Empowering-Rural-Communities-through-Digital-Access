const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  post: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [commentSchema],
});

module.exports = mongoose.model("Forum", forumSchema);
