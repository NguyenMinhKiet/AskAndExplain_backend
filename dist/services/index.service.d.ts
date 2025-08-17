import { ILog } from '../models/log.model.js';
import { IUser } from '../models/user.model.js';
export { answerServices } from './answer.service.js';
export { questionServices } from './question.service.js';
export declare const userServices: {
    model: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    getById(id: string): Promise<IUser>;
    getAll(): Promise<IUser[]>;
    create(data: Partial<IUser>, uniqueFilter: import("mongoose").FilterQuery<IUser>): Promise<IUser>;
    update(id: string, data: import("mongoose").UpdateQuery<IUser>): Promise<IUser>;
    delete(id: string): Promise<IUser>;
};
export declare const logServices: {
    model: import("mongoose").Model<ILog, {}, {}, {}, import("mongoose").Document<unknown, {}, ILog, {}, {}> & ILog & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    getById(id: string): Promise<ILog>;
    getAll(): Promise<ILog[]>;
    create(data: Partial<ILog>, uniqueFilter: import("mongoose").FilterQuery<ILog>): Promise<ILog>;
    update(id: string, data: import("mongoose").UpdateQuery<ILog>): Promise<ILog>;
    delete(id: string): Promise<ILog>;
};
//# sourceMappingURL=index.service.d.ts.map