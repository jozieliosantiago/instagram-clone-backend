const Post = require('../models/Post');
const PostController = require('./PostController');

module.exports = {
    async store(req, res) {
        const post = await Post.findById(req.params.id);
        post.likes += 1;
        await post.save();
        req.io.emit('like', post);

        // let postId = post.postId;

        // const posts = await Post.aggregate([
        //     {
        //         $lookup: {
        //             from: 'comments',
        //             localField: 'postId',
        //             foreignField: 'postId',
        //             as: 'comments'
        //         }
        //     }
        // ])
        
        // console.log(posts);
        return res.json(post);
    }
};