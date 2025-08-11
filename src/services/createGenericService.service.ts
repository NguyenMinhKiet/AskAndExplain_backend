import { Model, Document, Types, FilterQuery, UpdateQuery } from 'mongoose';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export function createGenericService<T extends Document>(model: Model<T>) {
    return {
        model,
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
            if (!data || Object.keys(data).length === 0) {
                throw new BadRequestError('Input data is empty');
            }

            // Get required fields from model.schema
            const requiredFields = Object.entries(model.schema.paths)
                .filter(([_, path]) => path.options.required)
                .map(([key]) => key);

            const missingFields = requiredFields.filter((field) => !(field in data));

            if (missingFields.length > 0) {
                throw new BadRequestError(`Missing required fields: ${missingFields.join(', ')}`);
            }

            if (uniqueFilter && Object.keys(uniqueFilter).length > 0) {
                const isExist = await model.findOne(uniqueFilter).exec();
                if (isExist) {
                    throw new BadRequestError(`${JSON.stringify(uniqueFilter)} already exists`);
                }
            }

            const doc = new model(data);
            return doc.save();
        },

        async update(id: string, data: UpdateQuery<T>): Promise<T> {
            if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid ID');
            if (!data || Object.keys(data).length === 0) {
                throw new BadRequestError('Input data is empty');
            }
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
