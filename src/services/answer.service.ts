import mongoose, { FilterQuery, Types, UpdateQuery } from 'mongoose';
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
    async update(id: string, data: UpdateQuery<IAnswer>): Promise<IAnswer> {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID');
        if (!data || Object.keys(data).length === 0) {
            throw new BadRequestError('Input data is empty');
        }
        const updated = await Answer.findByIdAndUpdate(id, data, { new: true }).populate('author').exec();
        if (!updated) throw new NotFoundError(`Id: ${id} Not Found`);
        return updated;
    },

    async getById(id: string): Promise<IAnswer> {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID');
        const found = await Answer.findById(id).populate('author').exec();
        if (!found) throw new NotFoundError(`Id: ${id} Not Found`);
        return found;
    },

    async getAll(): Promise<IAnswer[]> {
        return Answer.find().populate('author').exec();
    },

    async updateVote(id: string, delta: number): Promise<IAnswer> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestError('Invalid ID');
        }

        const answer = await Answer.findByIdAndUpdate(id, { $inc: { voteCount: delta } }, { new: true })
            .populate('author')
            .exec();

        if (!answer) {
            throw new NotFoundError(`Id: ${id} Not Found`);
        }

        return answer;
    },
};
