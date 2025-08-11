import { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import { answerServices, questionServices } from '../services/index.service.js';
import { createCrudController } from './createGenericController.controller.js';

export const baseQuestionController = createCrudController(questionServices);

export const questionController = {
    ...baseQuestionController,

    // Overwrite
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, author } = req.body.data;

            if (!author || typeof author !== 'string' || !mongoose.Types.ObjectId.isValid(author)) {
                return res.status(400).json({ message: 'Invalid or missing author ID' });
            }

            const dataToCreate = {
                title,
                description,
                author: new mongoose.Types.ObjectId(author),
            };

            const created = await questionServices.create(dataToCreate, {});

            res.status(201).json({ message: 'Created successfully', data: created });
        } catch (err) {
            next(err);
        }
    },

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const questions = await questionServices.getAll();
            res.json({ message: 'Get all successfully', data: questions });
        } catch (err) {
            next(err);
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const item = await questionServices.getById(id!);
            res.json({ message: 'Get successfully', data: item });
        } catch (err) {
            next(err);
        }
    },
};
