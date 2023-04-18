const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    creatrd_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);