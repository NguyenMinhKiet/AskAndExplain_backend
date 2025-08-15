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
                content: content.trim(),
                question: new mongoose.Types.ObjectId(questionId),
                author: new mongoose.Types.ObjectId(author),
            };

            const createdAnswer = await answerServices.create(dataToCreate, {});
            const createdFullDataAnswer = await answerServices.getById(createdAnswer._id as string);
            await questionServices.update(questionId, {
                $push: { answers: createdAnswer._id },
                $inc: { answerCount: 1 },
            });

            res.status(201).json({ message: 'Created successfully', data: createdFullDataAnswer });
        } catch (err) {
            next(err);
        }
    },
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;

            const deletedItem = await answerServices.delete(id!);
            res.json({ message: 'Deleted successfully', data: deletedItem });
        } catch (err) {
            next(err);
        }
    },

    async updateVote(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, delta } = req.body;

            const answer = await answerServices.updateVote(id, delta);
            res.json({ message: 'Updated Vote successfully', data: answer });
        } catch (err) {
            next(err);
        }
    },
};
