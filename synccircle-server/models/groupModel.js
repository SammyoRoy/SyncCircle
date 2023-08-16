const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    group_id: {
        type: String,
        required: true
    },
    group_name: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    days: {
        type: Array,
        required: true
    },
    users: {
        type: Array,
        required: false
    },
    master_array: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Group', groupSchema);

