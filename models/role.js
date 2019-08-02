import { Schema, model } from 'mongoose'
import { ensureFieldUniquity } from "./utils";

const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    isActive: { type: Boolean, default: false }
}, { timestamps: true });

RoleSchema.pre("save", true, ensureFieldUniquity("name"));

export default model('Role', RoleSchema);