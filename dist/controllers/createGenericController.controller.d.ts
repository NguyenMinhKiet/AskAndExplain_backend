import { Request, Response, NextFunction } from 'express';
import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
type ServiceCRUD<T> = {
    model: mongoose.Model<T>;
    getAll: () => Promise<T[]>;
    getById: (id: string) => Promise<T | null>;
    create: (data: Partial<T>, uniqueFilter: FilterQuery<T>) => Promise<T>;
    update: (id: string, data: UpdateQuery<T>) => Promise<T | null>;
    delete: (id: string) => Promise<T | null>;
};
export declare function createCrudController<T>(service: ServiceCRUD<T>): {
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
};
export {};
//# sourceMappingURL=createGenericController.controller.d.ts.map