import mongoose, { Document, Types } from 'mongoose';
export interface IAnswer extends Document {
    content: string;
    question: Types.ObjectId;
    author: Types.ObjectId;
    voteCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const answerSchema: mongoose.Schema<IAnswer, mongoose.Model<IAnswer, any, any, any, mongoose.Document<unknown, any, IAnswer, any, {}> & IAnswer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IAnswer, mongoose.Document<unknown, {}, mongoose.FlatRecord<IAnswer>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<IAnswer> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const Answer: mongoose.Model<IAnswer, {}, {}, {}, mongoose.Document<unknown, {}, IAnswer, {}, {}> & IAnswer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=answer.model.d.ts.map