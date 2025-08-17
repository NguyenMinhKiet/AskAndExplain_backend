import mongoose from 'mongoose';
import { IQuestion } from '../models/question.model.js';
export declare const baseQuestionServices: {
    model: mongoose.Model<IQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    getById(id: string): Promise<IQuestion>;
    getAll(): Promise<IQuestion[]>;
    create(data: Partial<IQuestion>, uniqueFilter: mongoose.FilterQuery<IQuestion>): Promise<IQuestion>;
    update(id: string, data: mongoose.UpdateQuery<IQuestion>): Promise<IQuestion>;
    delete(id: string): Promise<IQuestion>;
};
export declare const questionServices: {
    getById(id: string): Promise<IQuestion>;
    getAll(): Promise<IQuestion[]>;
    model: mongoose.Model<IQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    create(data: Partial<IQuestion>, uniqueFilter: mongoose.FilterQuery<IQuestion>): Promise<IQuestion>;
    update(id: string, data: mongoose.UpdateQuery<IQuestion>): Promise<IQuestion>;
    delete(id: string): Promise<IQuestion>;
};
//# sourceMappingURL=question.service.d.ts.map