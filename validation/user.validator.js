const { check, validationResult } = require("express-validator");

exports.validateUserSignup = [
    check("username", "username cannot be empty").not().isEmpty(),
    check("email", "enter a valid email").isEmail(),
    // check("location", "location cannot be empty").not().isEmpty(),
    // check("bio", "bio cannot be empty").not().isEmpty(),
    // check("skills", "please add atleast one skill").isArray().isLength({ min: 1 }),
    check(
        "password",
        "password must be atleast 6 characters long"
    ).isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ err: errors.array() });
        }
        
        const { company, website, status, social, location, skills, bio } = req.body;
        // optional fields
        req.body.company = company ? company : "";
        req.body.website = website ? website : "";
        req.body.status = status ? status : "";
        req.body.social = social ? social : {};
        req.body.location = location ? location : "";
        req.body.bio = bio ? bio : "";
        req.body.skills = skills ? skills : [];
        next();
    }
]