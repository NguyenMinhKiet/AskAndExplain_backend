import { answerServices, logServices, questionServices, userServices } from '../services/index.service.js';
import { createCrudController } from './createGenericController.controller.js';

export const userController = createCrudController(userServices);
export const answerController = createCrudController(answerServices);
export const questionController = createCrudController(questionServices);
export const logController = createCrudController(logServices);
export * as AuthController from './auth.controller.js';
