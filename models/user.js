import {
    Schema,
    model
} from 'mongoose'
import {
    ensureFieldUniquity
} from "./utils";

import bcrypt from 'bcrypt';
// import role from './role'

const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

UserSchema.pre("save", true, ensureFieldUniquity("login"))



// function (next) {
//     const user = this;


//     if (user.password && user.isModified('password')) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) console.log("Error in salt generator process!", err)
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) console.log("Error in hashing process!", err)
//                 user.password = hash;
//                 next();
//             })

//         })
//     } else next();

// });


export default model('User', UserSchema);