import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { BadRequestError } from '../utils/errors.js';

export interface IAnswer extends Document {
    content: string;
    question: Types.ObjectId;
    author: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const answerSchema = new Schema<IAnswer>({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Middleware hash password
answerSchema.pre('save', async function (next) {
    if (this.isModified('content') || this.isModified('author')) {
        this.updatedAt = new Date(Date.now());
        if (this.content.length < 3) {
            return next(new BadRequestError('Content must be at least 3 characters'));
        }
    }
    next();
});

export const Answer = model<IAnswer>('Answer', answerSchema);
