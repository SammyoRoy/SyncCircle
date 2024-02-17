const mongoose = require('mongoose');

const authUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    groups: {
        type: Array,
        required: true
    },
    login_type:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('AuthUser', authUserSchema);