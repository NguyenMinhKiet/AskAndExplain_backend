import mongoose, { FilterQuery, Types } from 'mongoose';
import { createGenericService } from './createGenericService.service.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';
import { IQuestion, Question } from '../models/question.model.js';

export const baseQuestionServices = createGenericService<IQuestion>(Question);

export const questionServices = {
    ...baseQuestionServices,

    async getById(id: string): Promise<IQuestion> {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID');
        const found = await Question.findById(id)
            .populate([
                { path: 'author', model: 'User' },
                { path: 'answers', populate: { path: 'author', model: 'User' } },
            ])
            .exec();
        if (!found) throw new NotFoundError(`Id: ${id} Not Found`);
        return found;
    },

    async getAll(): Promise<IQuestion[]> {
        return Question.find()
            .populate([
                { path: 'author', model: 'User' },
                { path: 'answers', populate: { path: 'author', model: 'User' } },
            ])
            .exec();
    },
};
