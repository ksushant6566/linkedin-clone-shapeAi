const express = require("express");
const router = express.Router();
const { verifyUser } = require('../authenticate');

const { validateJob } = require('../validation/job.validator');

const Job = require('../models/Job.model');

// @route   GET api/jobs
// @desc    Get Jobs
// @access  Private

router.get('/', verifyUser, async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({err: error})
    }
})

// @route   GET api/jobs/:jobId
// @desc    Get Job by Id
// @access  Private

router.get('/:jobId', verifyUser, async(req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({err: error});
    }
})

// @route   POST api/jobs
// @desc    Create Job
// @access  Private

router.post('/', verifyUser, validateJob, async(req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();

        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({err: error});
    }
})

// @route   DELETE api/jobs/:jobId
// @desc    DELETE Job by Id
// @access  Private

router.delete('/:jobId', verifyUser, async(req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.jobId);
        res.status(200).json({ message: "deleted successfully"});

    } catch (error) {
        res.status(500).json({err: error});
    }
})

module.exports = router;