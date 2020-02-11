const Comment = require('../models/Comment');

module.exports = {
    async index(req, res) {
        const comments = await Comment.find().sort('-createdAt')
        return res.json(comments);
    },
    async store(req, res) {
        const { postId, comment } = req.body;
        const commentText = await Comment.create({
            postId,
            comment,
        })
        return res.json(req.body);
    },

    async getCommentById(req, res) {
        const comments = await Comment.find({postId: req.params.postId});
        return res.json(comments)
    }
}