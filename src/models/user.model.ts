import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../utils/errors.js';

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    name: string;
    role: string;
    createdAt: Date;
}

export const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
});

// Middleware hash password
userSchema.pre('save', async function (next) {
    if (this.isModified('passwordHash')) {
        if (this.passwordHash.length < 6) {
            return next(new BadRequestError('Password must be at least 6 characters'));
        }
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    next();
});

export const User = model<IUser>('User', userSchema);
