let mongoose = require('mongoose');

let User = mongoose.model('Users', {
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    }
});

module.exports = {User};