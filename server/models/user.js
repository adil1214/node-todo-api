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
 
// method that genearates auth token (applies on an instance of a model only)
UserSchema.methods.generateAuthToken = function() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();   // need to move the salt into a config variable later

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};

// find a user by token (applies on the whole user model)
UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');      // move the salt into a config var
    } catch(e) {
        // handle the case where the token doesnt match up with the one in the database
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

let User = mongoose.model('Users', UserSchema);

module.exports = {User};