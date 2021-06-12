const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authenticate = require('../authenticate');

const Post = require('../models/Post.model');

router.get('/', authenticate.verifyUser, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ err: error });
    }
});

router.post('/', [
    check("text", "post cannot be empty").not().isEmpty(),
], authenticate.verifyUser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const post = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user._id,
            likes: [],
            comments: []
        });

        await post.save();
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({err: error});
    }

});
