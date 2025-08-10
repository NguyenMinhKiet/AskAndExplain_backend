import { Model, Document, Types, FilterQuery } from 'mongoose';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export function createGenericService<T extends Document>(model: Model<T>) {
    return {
        async getById(id: string): Promise<T> {
            if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID');
            const found = await model.findById(id).exec();
            if (!found) throw new NotFoundError(`Id: ${id} Not Found`);
            return found;
        },

        async getAll(): Promise<T[]> {
            return model.find().exec();
        },

        async create(data: Partial<T>, uniqueFilter: FilterQuery<T>): Promise<T> {
            const isExist = await model.findOne(uniqueFilter);
            if (isExist) {
                throw new BadRequestError(`${uniqueFilter} already exists`);
            }
            const doc = new model(data);
            return doc.save();
        },

        async update(id: string, data: Partial<T>): Promise<T> {
            if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID');
            const updated = await model.findByIdAndUpdate(id, data, { new: true }).exec();
            if (!updated) throw new NotFoundError(`Id: ${id} Not Found`);
            return updated;
        },

        async delete(id: string): Promise<T> {
            if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID');
            const deleted = await model.findByIdAndDelete(id).exec();
            if (!deleted) throw new NotFoundError(`Id: ${id} Not Found`);
            return deleted;
        },
    };
}
