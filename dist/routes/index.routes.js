import { Router } from 'express';
import { AuthController, userController, questionController, answerController, } from '../controllers/index.controller.js';
import { AuthMiddlewares, CheckAlreadyLoginMiddlewares, logMiddleware } from '../middlewares/index.middleware.js';
const router = Router();
// Auth
router.post('/register', AuthController.register);
router.post('/login', CheckAlreadyLoginMiddlewares, logMiddleware('auth'), AuthController.login);
// User
router.get('/users', userController.getAll);
router.get('/users/:id', logMiddleware('users'), userController.getById);
router.put('/users', AuthMiddlewares, logMiddleware('users'), userController.update);
router.delete('/users', AuthMiddlewares, logMiddleware('users'), userController.delete);
// Question
router.get('/questions', questionController.getAll);
router.get('/questions/:id', logMiddleware('questions'), questionController.getById);
router.post('/questions', AuthMiddlewares, logMiddleware('questions'), questionController.create);
router.put('/questions', AuthMiddlewares, logMiddleware('questions'), questionController.update);
router.delete('/questions', AuthMiddlewares, logMiddleware('questions'), questionController.delete);
// Answer
router.post('/answers/:questionId', AuthMiddlewares, logMiddleware('answers'), answerController.create);
router.put('/answers', AuthMiddlewares, logMiddleware('answers'), answerController.update);
router.put('/answers/updateVote', AuthMiddlewares, logMiddleware('answers'), answerController.updateVote);
router.delete('/answers', AuthMiddlewares, logMiddleware('answers'), answerController.delete);
export default router;
//# sourceMappingURL=index.routes.js.map