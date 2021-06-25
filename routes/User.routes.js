const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport');

const { validateUserSignup } = require('../validation/user.validator');
const authenticate = require('../authenticate');

const User = require('../models/User.model');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: SENDGRID_API_KEY
    }
}));

const userRouter = express.Router();

userRouter.get('/:userId', authenticate.verifyUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({err: error});
    }
})

userRouter.post('/signup', validateUserSignup, async (req, res) => {
    try {
        const user = await User.register(new User(req.body), req.body.password);
        await user.save();

        const mailOptions = {
            to: user.email,
            from: 'ksushant6566@gmail.com',
            subject: "signup successfull",
            html: "<h1>welcome to linkedin!</h1>"
        }
        transporter.sendMail(mailOptions);

        passport.authenticate('local')(req, res, () => {
            res.status(200).json({
                success: true,
                status: "Registration successful!"
            });
        });

    } catch (error) {
        res.status(500).json({ err: error });
    }
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {

    const token = authenticate.getToken({ _id: req.user._id })
    res.status(200).json({
        success: true,
        status: "login successfull!",
        token: token,
        ...req.user._doc,
    });
})

// emails reset link
userRouter.post('/forgot-password', async (req, res) => {

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
                <h5>click the link http://localhost:3000/reset/${token} to change your password within one hour</h5>
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.json("unsuccessfull");
            } else {
                console.log("Email sent: " + info.response);
                res.json({msg: "email sent successfully"});
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({err: error});
    }
})

// reset link
    userRouter.post('/reset/:resetToken', async (req, res) => {
        try {
            const resetToken = req.params.resetToken;
            const user = await User.findOne({ resetToken: resetToken });
    
            if(user.expireToken > Date.now()) {
                const newPassword = req.body.password;
                await user.setPassword(newPassword);
                await user.save();
                res.status(200).json(user);
            }
            else res.status(403).json({err: "expired token"})
        } catch (error) {
         res.status(500).json({err: error});
        }
    })

module.exports = userRouter;