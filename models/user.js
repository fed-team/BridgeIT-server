import {
    Schema,
    model
} from 'mongoose'
import {
    ensureFieldUniquity
} from "./utils";

import bcrypt from 'bcrypt';
// import Role from './role'

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
        default: false
    }
});

// const passwordHash = (ensureFieldUniquity) => {


//     if (this.password && this.isModified('password')) {
//         this.password = bcrypt.hash(this.password, 10, function (err, hash) {
//             if (err) console.log("Error in hashing process!", err)
//             else hash;
//         })
//     };
//     ensureFieldUniquity("login")

// }

UserSchema.pre("save", true, ensureFieldUniquity('login'));

export default model('User', UserSchema);