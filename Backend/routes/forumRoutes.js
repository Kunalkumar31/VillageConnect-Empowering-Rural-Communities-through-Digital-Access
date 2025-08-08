const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    getAllPosts,
    createPost,
    addComment,
    editComment,
    deleteComment,
} = require("../controllers/forumController");

//  routes
router.get("/", getAllPosts);
router.post("/", auth, createPost);
router.post("/:id/comment", auth, addComment);

router.put("/:postId/comment/:commentId", auth, editComment);

router.delete("/:postId/comment/:commentId", auth, deleteComment);


module.exports = router;
