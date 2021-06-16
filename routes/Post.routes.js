const express = require("express");
const router = express.Router();
const { verifyUser } = require('../authenticate');

const { validatePost, validateComment } = require('../validation/post.validator');

const Post = require('../models/Post.model');

// @route   GET api/posts
// @desc    Get Post
// @access  Private
router.get('/', verifyUser, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ err: error });
    }
});

// @route   GET api/posts/:postId
// @desc    Get Post by Id
// @access  Private
router.get('/:postId', verifyUser, async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({err: error})
    }
})

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', verifyUser, validatePost, async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({err: error});
    }
});

// @route   DELETE api/posts/:postId
// @desc    Delete post
// @access  Private
router.delete('/:postId', verifyUser, async(req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if(post.user.toString() === req.user._id.toString()) {
            await post.delete();
            return res.status(200).json({message: "post deleted successfully"});
        } else res.status(403).json({message: "forbidden: cannot delete someone else's post"});

    } catch (error) {
        res.status(500).json({err: error});
    }
})

// @route   PUT api/posts/:postId
// @desc    Update post
// @access  Private

router.put('/:postId', verifyUser, validatePost, async(req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        
        if(post.user.toString() === req.user._id.toString()) {
            post.text = req.body.text;
            await post.save();
            res.status(200).json(post);
        } else res.status(403).json({message: "forbidden: cannot edit someone else's post"});
    } catch (error) {
        res.status(500).json({err: error});
    }
})

// @route   POST api/posts/like/:postId
// @desc    Like/Unlike post
// @access  Private

router.post('/like/:postId', verifyUser, async(req, res) => {
    try {
        const postId = req.params.postId;
        const user = req.user;
        const post = await Post.findById(postId);

        const likeIndex = post.likes.findIndex(like => like.user.toString() === user._id.toString());
        if (likeIndex === -1) {
            post.likes.unshift({ user: user._id });
        } else {
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({err: error});
    }
})

// @route   POST api/posts/comment/:postId
// @desc    Comment on a post
// @access  Private

router.post('/comment/:postId', verifyUser, validateComment, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        post.comments.unshift(req.body);
        await post.save();
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({err: error})
    }
})

// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    DELETE a Comment
// @access  Private

router.delete('/comment/:postId/:commentId', verifyUser, async(req, res) => {
    try {
        const user = req.user;
        const post = await Post.findById(req.params.postId);
        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.commentId);
        if (commentIndex === -1) 
            return res.status(400).json({err: "comment not found"})

        if(post.comments[commentIndex].user.toString() === user._id.toString()) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return res.status(200).json(post);
        }
        res.status(403).json({err: "forbidden"});
    } catch (error) {
        console.log("here", error)
        res.status(500).json({err: error})
    }
})

// @route   PUT api/posts/comment/:postId/:commentId
// @desc    Update a Comment
// @access  Private

router.put('/comment/:postId/:commentId', verifyUser, validateComment, async(req, res) => {
    try {
        const user = req.user;
        const post = await Post.findById(req.params.postId);
        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.commentId);
        if (commentIndex === -1) 
            return res.status(400).json({err: "comment not found"})

        if(post.comments[commentIndex].user.toString() === user._id.toString()) {
            post.comments[commentIndex].comment = req.body.comment;
            await post.save();
            return res.status(200).json(post);
        }
        res.status(403).json({err: "forbidden"});
    } catch (error) {
        console.log("here", error)
        res.status(500).json({err: error})
    }
})

module.exports = router