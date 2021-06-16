const express = require("express");
const router = express.Router();
const { verifyUser } = require('../authenticate');

const { validateCompany, validateCompanyUpdate } = require('../validation/company.validator');

const Company = require('../models/Company.model');

// @route   GET api/company
// @desc    Get Companys
// @access  Private

router.get('/', verifyUser, async (req, res) => {
    try {
        const companys = await Company.find();
        res.status(200).json(companys)
    } catch (error) {
        res.status(500).json({err: error})
    }
})

// @route   GET api/company/:companyId
// @desc    Get Company by Id
// @access  Private

router.get('/:companyId', verifyUser, async(req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({err: error});
    }
})

// @route   POST api/company
// @desc    Create Companys
// @access  Private

router.post('/', verifyUser, validateCompany, async(req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();

        res.status(200).json(company);
    } catch (error) {
        res.status(400).json({err: error});
    }
})

// @route   PUT api/company/:companyId
// @desc    Update Company by Id
// @access  Private

router.put('/:companyId', verifyUser, validateCompanyUpdate, async (req, res) => {
    try {
        const company = Company.findById(req.params.companyId)
        const { location , desc } = req.body
        
        company.location = location || company.location;
        company.desc = desc || company.desc;

        await company.save();
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({err: error})
    }
})

// @route   DELETE api/company/:companyId
// @desc    DELETE Company by Id
// @access  Private

router.delete('/:companyId', verifyUser, async(req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.companyId);
        res.status(200).json({ message: "deleted successfully"});

    } catch (error) {
        res.status(500).json({err: error});
    }
})

module.exports = router;