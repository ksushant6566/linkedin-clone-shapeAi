const { check, validationResult } = require("express-validator");

exports.validateJob = [
    check("company", "company id must be valid").isMongoId(),
    check("desc", "job description cannot be empty").not().isEmpty(),
    check("location", "location cannot be empty").not().isEmpty(),
    check("skills", "add atleast 1 skill").isArray().isLength({ min: 1 }),
    check("role", "role cannot be empty").not().isEmpty(),
    check("experience", "experience not valid").isNumeric(),
    check("salary", "salary cannot be empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]