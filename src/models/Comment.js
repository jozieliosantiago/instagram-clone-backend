const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: String,
    comment: String,
},{
    timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema);
