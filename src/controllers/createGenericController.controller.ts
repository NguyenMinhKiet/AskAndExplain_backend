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

export function createCrudController<T>(service: ServiceCRUD<T>) {
    return {
        async getAll(req: Request, res: Response, next: NextFunction) {
            try {
                const items = await service.getAll();
                res.json({ message: 'Get all successfully', data: items });
            } catch (err) {
                next(err);
            }
        },
        async getById(req: Request, res: Response, next: NextFunction) {
            try {
                const id = req.params.id;
                const item = await service.getById(id!);
                res.json({ message: 'Get successfully', data: item });
            } catch (err) {
                next(err);
            }
        },
        async create(req: Request, res: Response, next: NextFunction) {
            try {
                const { data, uniqueFilter } = req.body;
                const newItem = await service.create(data, uniqueFilter);
                res.status(201).json({ message: 'Created successfully', data: newItem });
            } catch (err) {
                next(err);
            }
        },
        async update(req: Request, res: Response, next: NextFunction) {
            try {
                const { id, data } = req.body;
                const updatedItem = await service.update(id, data);
                res.json({ message: 'Updated successfully', data: updatedItem });
            } catch (err) {
                next(err);
            }
        },
        async delete(req: Request, res: Response, next: NextFunction) {
            try {
                const { id } = req.body;

                const deletedItem = await service.delete(id!);
                res.json({ message: 'Deleted successfully', data: deletedItem });
            } catch (err) {
                next(err);
            }
        },
    };
}
