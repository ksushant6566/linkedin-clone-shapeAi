const { check, validationResult } = require("express-validator");

exports.validatePost = [
    check("text", "post cannot be empty").not().isEmpty(),
    check("image", "invalid image url").isURL().optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        req.body.user = req.user._id;
        req.body.likes = [];
        req.body.comments = [];
        next();
    }
]

exports.validateComment = [
    check("comment", "comment cannot be empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
        req.body.user = req.user._id;
        req.body.name = req.user.username;
        next();
    }
]