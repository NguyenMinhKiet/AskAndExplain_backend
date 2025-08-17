import mongoose, { Schema, model } from 'mongoose';
import { BadRequestError } from '../utils/errors.js';
import { Answer } from './answer.model.js';
const questionSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answerCount: { type: Number, default: 0 },
    answers: { type: [mongoose.Schema.Types.ObjectId], ref: 'Answer', default: [] },
}, { timestamps: true });
// Middleware hash password
questionSchema.pre('save', async function (next) {
    if (this.isModified('title') || this.isModified('content')) {
        if (this.title.length < 3 || this.content.length < 3) {
            return next(new BadRequestError('Title and Description must be at least 3 characters'));
        }
    }
    next();
});
questionSchema.pre('findOneAndDelete', async function (next) {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
        await Answer.deleteMany({ questionId: doc._id });
    }
    next();
});
export const Question = model('Question', questionSchema);
//# sourceMappingURL=question.model.js.map