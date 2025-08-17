import { userServices } from '../services/index.service.js';
import { createCrudController } from './createGenericController.controller.js';
export * as AuthController from './auth.controller.js';
export { questionController } from './question.controller.js';
export { answerController } from './answer.controller.js';
export const userController = createCrudController(userServices);
//# sourceMappingURL=index.controller.js.map