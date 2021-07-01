const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GlobalMessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('Global_message',GlobalMessageSchema);