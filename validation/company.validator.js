const { check, validationResult } = require("express-validator");

exports.validateCompany = [
    check("name", "company name connot be empty").not().isEmpty(),
    check("desc", "company description cannot be empty").not().isEmpty(),
    check("location", "location cannot be empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

exports.validateCompanyUpdate = [
    check("desc", "company description cannot be empty").not().isEmpty(),
    check("location", "location cannot be empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]