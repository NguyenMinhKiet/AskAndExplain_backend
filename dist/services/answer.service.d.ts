import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { IAnswer } from '../models/answer.model.js';
export declare const baseAnswerServices: {
    model: mongoose.Model<IAnswer, {}, {}, {}, mongoose.Document<unknown, {}, IAnswer, {}, {}> & IAnswer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    getById(id: string): Promise<IAnswer>;
    getAll(): Promise<IAnswer[]>;
    create(data: Partial<IAnswer>, uniqueFilter: mongoose.FilterQuery<IAnswer>): Promise<IAnswer>;
    update(id: string, data: mongoose.UpdateQuery<IAnswer>): Promise<IAnswer>;
    delete(id: string): Promise<IAnswer>;
};
export declare const answerServices: {
    create(data: Partial<IAnswer>, uniqueFilter: FilterQuery<IAnswer>): Promise<IAnswer>;
    update(id: string, data: UpdateQuery<IAnswer>): Promise<IAnswer>;
    getById(id: string): Promise<IAnswer>;
    getAll(): Promise<IAnswer[]>;
    updateVote(id: string, delta: number): Promise<IAnswer>;
    model: mongoose.Model<IAnswer, {}, {}, {}, mongoose.Document<unknown, {}, IAnswer, {}, {}> & IAnswer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    delete(id: string): Promise<IAnswer>;
};
//# sourceMappingURL=answer.service.d.ts.map