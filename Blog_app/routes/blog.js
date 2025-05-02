const express= require("express");
const router = express.Router();

//import controller
const {dummyLink, likePost,unLikePost} = require("../controllers/likeController");
const {createComment} = require("../controllers/commentController");
const {createPost, getAllPost} = require("../controllers/postController");

const {deletePost} = require('../controllers/DeletePost');

// DELETE route for deleting blog

// mapping
router.get("/dummyroute", dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPost);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unLikePost);
router.delete("/delete/:id", deletePost);

module.exports = router;
