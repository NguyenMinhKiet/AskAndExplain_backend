import { Schema, model, Document } from 'mongoose';
import { BadRequestError } from '../utils/errors.js';
import { IUser, userSchema } from './user.model.js';
import { answerSchema, IAnswer } from './answer.model.js';

export interface IQuestion extends Document {
    title: string;
    description: string;
    author: IUser;
    answerCount: number;
    answers: IAnswer[];
    createdAt: Date;
    updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: userSchema, required: true },
    answerCount: { type: Number, default: 0 },
    answers: { type: [answerSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Middleware hash password
questionSchema.pre('save', async function (next) {
    if (this.isModified('title') || this.isModified('description')) {
        this.updatedAt = new Date(Date.now());
        if (this.title.length < 3 || this.description.length < 3) {
            return next(new BadRequestError('Title and Description must be at least 3 characters'));
        }
    }
    next();
});

export const Question = model<IQuestion>('Question', questionSchema);
