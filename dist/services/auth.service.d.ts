import { IUser } from '../models/user.model.js';
export declare function registerUser(email: string, password: string, name?: string): Promise<IUser>;
export declare function validateUser(email: string, password: string): Promise<IUser>;
//# sourceMappingURL=auth.service.d.ts.map