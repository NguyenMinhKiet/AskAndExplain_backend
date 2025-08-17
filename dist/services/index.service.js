import { Log } from '../models/log.model.js';
import { User } from '../models/user.model.js';
import { createGenericService } from './createGenericService.service.js';
export { answerServices } from './answer.service.js';
export { questionServices } from './question.service.js';
export const userServices = createGenericService(User);
export const logServices = createGenericService(Log);
//# sourceMappingURL=index.service.js.map