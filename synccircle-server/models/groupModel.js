const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    group_id: {
        type: String,
        required: true
    },
    group_name: {
        type: String,
        required: true,
        length: 50
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    time_zone: {
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
    },
    dotw: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Group', groupSchema);

