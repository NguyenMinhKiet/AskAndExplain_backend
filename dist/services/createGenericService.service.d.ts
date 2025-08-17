import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
export declare function createGenericService<T extends Document>(model: Model<T>): {
    model: Model<T, {}, {}, {}, import("mongoose").IfAny<T, any, Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)>, any>;
    getById(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    create(data: Partial<T>, uniqueFilter: FilterQuery<T>): Promise<T>;
    update(id: string, data: UpdateQuery<T>): Promise<T>;
    delete(id: string): Promise<T>;
};
//# sourceMappingURL=createGenericService.service.d.ts.map