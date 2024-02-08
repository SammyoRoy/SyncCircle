const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true,
        length: 50
    },
    email: {
        type: String,
        required: false
    },
    groups: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);