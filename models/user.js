import {
    Schema,
    model
} from "mongoose";
import {
    ensureFieldUniquity
} from "./utils";

import bcrypt from "bcrypt";
import role from './role'

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
        type: [role.schema],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

UserSchema.pre("save", function (next) {
    const user = this;

    if (user.password && user.isModified("password")) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }
    next();
    ensureFieldUniquity("login");
});

export default model("User", UserSchema);