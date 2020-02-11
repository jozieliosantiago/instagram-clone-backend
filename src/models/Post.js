const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _id = { type: Schema.Types.ObjectId, auto: true };

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags:String,
    image: String,
    postId: String,
    likes: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);
