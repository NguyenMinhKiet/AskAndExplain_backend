import { Answer, IAnswer } from '../models/answer.model.js';
import { ILog, Log } from '../models/log.model.js';
import { IQuestion, Question } from '../models/question.model.js';
import { IUser, User } from '../models/user.model.js';
import { createGenericService } from './createGenericService.service.js';

export const userServices = createGenericService<IUser>(User);
export const questionServices = createGenericService<IQuestion>(Question);
export const answerServices = createGenericService<IAnswer>(Answer);
export const logServices = createGenericService<ILog>(Log);
