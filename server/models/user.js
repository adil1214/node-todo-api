const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[{
        access: {
           type: String,
           required: true 
        },
        token: {
            type: String,
            required: true 
        }
    }]
});

// overriding toJSON method 
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};
 
// method that genearates auth token
UserSchema.methods.generateAuthToken = function() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();   // need to move the salt into a config variable later

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};

let User = mongoose.model('Users', UserSchema);

module.exports = {User};