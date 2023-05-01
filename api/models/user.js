const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const validateEmail = function (email) {
    return (/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).test(email);
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: "Email is required",
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
    },
    creatrd_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    if (user.isNew || user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            })
        })
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        callback(err, isMatch);
    })
}


module.exports = mongoose.model('User', userSchema);