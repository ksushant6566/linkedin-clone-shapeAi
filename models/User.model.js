const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    }
})

const EducationSchema = new Schema({
    school: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    fieldofstudy: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    }
})


const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    company: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: String,
    },
    status: {
        type: String,
    },
    skills: {
        type: [String],
    },
    bio: {
        type: String,
    },
    experience: [ExperienceSchema],
    education: [EducationSchema],
    social: {
        youtube: {
            type: String
        },
        github: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    resetToken: { 
        type: String 
    },
    expireToken: { 
        type: String 
    }
}, {
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);