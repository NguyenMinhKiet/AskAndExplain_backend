import { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import { answerServices, questionServices } from '../services/index.service.js';
import { createCrudController } from './createGenericController.controller.js';
import { BadRequestError } from '../utils/errors.js';

export const baseAnswerController = createCrudController(answerServices);

export const answerController = {
    ...baseAnswerController,

    // Overwrite
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const questionId = req.params.questionId;
            if (!questionId || !mongoose.Types.ObjectId.isValid(questionId)) {
                throw new BadRequestError('Invalid or missing question ID');
            }
            const { content, author } = req.body;

            if (!author || typeof author !== 'string' || !mongoose.Types.ObjectId.isValid(author)) {
                throw new BadRequestError('Invalid or missing author ID');
            }

            if (!content) throw new BadRequestError('Content is required');
            const dataToCreate = {
                content,
                question: new mongoose.Types.ObjectId(questionId),
                author: new mongoose.Types.ObjectId(author),
            };

            const createdAnswer = await answerServices.create(dataToCreate, {});
            await questionServices.update(questionId, { $push: { answers: createdAnswer._id } });

            res.status(201).json({ message: 'Created successfully', data: createdAnswer });
        } catch (err) {
            next(err);
        }
    },
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, questionId } = req.body;

            const deletedItem = await answerServices.delete(id!);
            await questionServices.update(questionId, { $pull: { answers: id } });
            res.json({ message: 'Deleted successfully', data: deletedItem });
        } catch (err) {
            next(err);
        }
    },
};
