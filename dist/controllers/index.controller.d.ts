export * as AuthController from './auth.controller.js';
export { questionController } from './question.controller.js';
export { answerController } from './answer.controller.js';
export declare const userController: {
    getAll(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): Promise<void>;
    getById(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): Promise<void>;
    create(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): Promise<void>;
    update(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): Promise<void>;
    delete(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): Promise<void>;
};
//# sourceMappingURL=index.controller.d.ts.map