import mongoose, { Document, Types } from 'mongoose';
import { IAnswer } from './answer.model.js';
export interface IQuestion extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
    answerCount: number;
    answers: IAnswer[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Question: mongoose.Model<IQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=question.model.d.ts.map