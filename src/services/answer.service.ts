import mongoose, { FilterQuery, Types } from 'mongoose';
import { Answer, IAnswer } from '../models/answer.model.js';
import { createGenericService } from './createGenericService.service.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export const baseAnswerServices = createGenericService<IAnswer>(Answer);

export const answerServices = {
    ...baseAnswerServices,

    async create(data: Partial<IAnswer>, uniqueFilter: FilterQuery<IAnswer>): Promise<IAnswer> {
        if (!data || Object.keys(data).length === 0) {
            throw new BadRequestError('Input data is empty');
        }

        if (!data.question) throw new BadRequestError('QuestionId is required');

        // Get required fields from model.schema
        const requiredFields = Object.entries(Answer.schema.paths)
            .filter(([_, path]) => path.options.required)
            .map(([key]) => key);

        const missingFields = requiredFields.filter((field) => !(field in data));

        if (missingFields.length > 0) {
            throw new BadRequestError(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const doc = new Answer(data);
        return doc.save();
    },

    async getById(id: string): Promise<IAnswer> {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID');
        const found = await Answer.findById(id).populate('User').populate('Question').exec();
        if (!found) throw new NotFoundError(`Id: ${id} Not Found`);
        return found;
    },

    async getAll(): Promise<IAnswer[]> {
        return Answer.find().populate('User').populate('Question').exec();
    },
};
