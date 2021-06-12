const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

const User = require('../models/User.model');

const NODEMAILER_USERNAME = process.env.NODEMAILER_USERNAME;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: NODEMAILER_USERNAME,
        pass: NODEMAILER_PASSWORD,
    },
});

const authenticate = require('../authenticate');

const userRouter = express.Router();

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
        const user = await User.register(new User({ 
            username: req.body.username,
            email: req.body.email,
            location: req.body.location,
            bio: req.body.bio,
            skills: req.body.skills
        }), 
            req.body.password);

        const { company, website, status, social } = req.body;

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

userRouter.post('/reset-password', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ err: "user not found" });
        
        const buffer = crypto.randomBytes(32);
        const token = buffer.toString("hex");

        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;

        await user.save();

        const mailOptions = {
            from: "ksushant6566@gmail.com",
            to: `${user.email}`,
            subject: "reset password",
            html: `
                <p>A request to change your password was made,</p>
                <h5>click the link <a href="http://localhost:8080/reset/${token}></a> to change your password within one hour</h5>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.json("unsuccessfull");
            } else {
                console.log("Email sent: " + info.response);
                res.json("email sent successfully");
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({err: error});
    }
})

module.exports = userRouter;