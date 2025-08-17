import mongoose, { Document, Types } from 'mongoose';
export interface ILog extends Document {
    userId?: Types.ObjectId;
    action: string;
    resource?: string;
    resourceId?: string;
    ip?: string;
    message?: string;
    status?: 'success' | 'fail';
    errorMessage?: string;
    createdAt: Date;
}
export declare const logSchema: mongoose.Schema<ILog, mongoose.Model<ILog, any, any, any, mongoose.Document<unknown, any, ILog, any, {}> & ILog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ILog, mongoose.Document<unknown, {}, mongoose.FlatRecord<ILog>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<ILog> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const Log: mongoose.Model<ILog, {}, {}, {}, mongoose.Document<unknown, {}, ILog, {}, {}> & ILog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=log.model.d.ts.map