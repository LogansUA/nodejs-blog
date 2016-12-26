import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import constants from './constants';

let User = new mongoose.Schema({
    email: {
        type: String,
        required: '{PATH} is required!',
    },
    role: {
        type: String,
        default: constants.ROLE_USER,
        enum: [constants.ROLE_USER, constants.ROLE_ADMIN],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

User.plugin(passportLocalMongoose, {
    usernameField: 'email',
});

export default mongoose.model('User', User);
