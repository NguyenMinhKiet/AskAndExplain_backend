import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { BadRequestError } from '../utils/errors.js';
import { Question } from './question.model.js';

export interface IAnswer extends Document {
    content: string;
    question: Types.ObjectId;
    author: Types.ObjectId;
    voteCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export const answerSchema = new Schema<IAnswer>(
    {
        content: { type: String, required: true },
        voteCount: { type: Number, default: 0 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    },
    { timestamps: true },
);

// Middleware hash password
answerSchema.pre('save', async function (next) {
    if (this.isModified('content') || this.isModified('author')) {
        if (this.content.length < 3) {
            return next(new BadRequestError('Content must be at least 3 characters'));
        }
    }
    next();
});

answerSchema.pre('findOneAndDelete', async function (next) {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
        await Question.updateOne(
            {
                _id: doc.question,
            },
            {
                $pull: { answers: doc._id },
                $inc: { answerCount: -1 },
            },
        );
    }
    next();
});

export const Answer = model<IAnswer>('Answer', answerSchema);
