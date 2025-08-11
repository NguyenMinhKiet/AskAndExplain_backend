import mongoose, { Schema, model, Document, Types } from 'mongoose';

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

export const logSchema = new Schema<ILog>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    resource: { type: String },
    resourceId: { type: String },
    ip: { type: String },
    message: { type: String },
    status: { type: String },
    errorMessage: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const Log = model<ILog>('Log', logSchema);
