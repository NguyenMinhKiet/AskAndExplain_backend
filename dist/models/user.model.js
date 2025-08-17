import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../utils/errors.js';
export const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Middleware hash password
userSchema.pre('save', async function (next) {
    this.updatedAt = new Date(Date.now());
    if (this.isModified('passwordHash')) {
        if (this.passwordHash.length < 6) {
            return next(new BadRequestError('Password must be at least 6 characters'));
        }
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    next();
});
export const User = model('User', userSchema);
//# sourceMappingURL=user.model.js.map