import { Schema, model } from 'mongoose'
import { ensureFieldUniquity } from "./utils";

const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    color: { type: Number, required: true },
    isActive: { type: Boolean, default: false }
});

RoleSchema.pre("save", true, ensureFieldUniquity("name"));

export default model('Role', RoleSchema);