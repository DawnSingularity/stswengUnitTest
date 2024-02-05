const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};
PostController.index = (req, res) => {
    // Find all posts
    return PostModel.find({}, (err, posts) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(posts);
        }
    });
};
PostController.update = (req, res) => {

};

PostController.findPost = (req, res) => {

};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;