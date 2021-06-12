const express = require('express')
const passport = require('passport')
const { check, validationResult } = require("express-validator");

const User = require('../models/User.model')

const authenticate = require('../authenticate');

const userRouter = express.Router()

userRouter.post('/signup', [
    check("username", "username cannot be empty").not().isEmpty(),
    check("email", "enter a valid email").isEmail(),
    check("location", "location cannot be empty").not().isEmpty(),
    check("bio", "bio cannot be empty").not().isEmpty(),
    check("skills", "please add atleast one skill").isArray().isLength({ min: 1 }),
    check(
        "password",
        "password must be atleast 6 characters long"
    ).isLength({ min: 6 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.register(new User({ username: req.body.username }), req.body.password);

        const { email, location, bio, skills, company, website, status, social } = req.body;

        // must have fields
        user.email = email;
        user.location = location;
        user.bio = bio;
        user.skills = skills;

        // optional fields
        user.company = company ? company : "";
        user.website = website ? website : "";
        user.status = status ? status : "";
        user.social = social ? social : {};


        user.save((err, user) => {
            if (err) {
                res.status(500).json({ err: err })
                return;
            }
            passport.authenticate('local')(req, res, () => {
                res.status(200).json({
                    success: true,
                    status: "Registration successful!"
                });
            });
        })
    } catch (error) {
        res.status(500).json({ err: error });
    }
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {

    const token = authenticate.getToken({ _id: req.user._id })
    res.status(200).json({
        success: true,
        status: "You are successfully logged In!",
        token: token
    });
})

module.exports = userRouter;