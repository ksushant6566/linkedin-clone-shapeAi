const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    desc: {
        type: String,
        required: true
    },
    location: { 
        type: String,
        required: true
    },
    skills: [ String ],
    role: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    salary: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);