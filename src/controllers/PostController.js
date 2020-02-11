const Post = require('../models/Post');
const Comment = require('../models/Comment');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {

        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: 'postId',
                    foreignField: 'postId',
                    as: 'comments'
                }
            }
        ])

        return res.json(posts);
    },

    async getComments(post) {
        let result = await Comment.find({postId: post._id})
        console.log(result);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        fs.unlinkSync(req.file.path);

        let characters = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYz0123456789!@#$%&'
        
        let postId = author.replace(' ', '').toLowerCase();
        
        for(let i = 0; i < 20; i++) {
            let position = Math.floor(Math.random() * characters.length);
            postId += characters[position];
        }

        const post = await Post.create({
            author,
            place,
            image,
            description,
            hashtags,
            image: fileName,
            postId
        })

        req.io.emit('post', post);

        return res.json(post);
    }
};