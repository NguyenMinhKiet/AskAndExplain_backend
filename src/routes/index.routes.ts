import { Router } from 'express';

import {
    AuthController,
    userController,
    questionController,
    answerController,
    logController,
} from '../controllers/index.controller.js';

import { AuthMiddlewares, CheckAlreadyLoginMiddlewares } from '../middlewares/index.middleware.js';

const router = Router();

// Auth
router.post('/register', AuthController.register);
router.post('/login', CheckAlreadyLoginMiddlewares, AuthController.login);

// User
router.get('/users', AuthMiddlewares, userController.getAll);
router.get('/users/:id', AuthMiddlewares, userController.getById);
router.put('/users', AuthMiddlewares, userController.update);
router.delete('/users', AuthMiddlewares, userController.delete);

// Question
router.get('/questions', AuthMiddlewares, questionController.getAll);
router.get('/questions/:id', AuthMiddlewares, questionController.getById);
router.put('/questions', AuthMiddlewares, questionController.update);
router.delete('/questions', AuthMiddlewares, questionController.delete);

// Answer
router.get('/users', AuthMiddlewares, answerController.getAll);
router.get('/users/:id', AuthMiddlewares, answerController.getById);
router.put('/users', AuthMiddlewares, answerController.update);
router.delete('/users', AuthMiddlewares, answerController.delete);

// Log
router.get('/logs', AuthMiddlewares, logController.getAll);
router.get('/logs/:id', AuthMiddlewares, logController.getById);
router.put('/logs', AuthMiddlewares, logController.update);
router.delete('/logs', AuthMiddlewares, logController.delete);

export default router;
