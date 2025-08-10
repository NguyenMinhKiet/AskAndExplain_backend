import { Schema, model, Document } from 'mongoose';

export interface ILog extends Document {
    userId?: string;
    action: string;
    resource?: string;
    resourceId?: string;
    ip?: string;
    message?: string;
    createdAt: Date;
}

export const logSchema = new Schema<ILog>({
    userId: { type: String },
    action: { type: String, required: true },
    resource: { type: String },
    resourceId: { type: String },
    ip: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const Log = model<ILog>('Log', logSchema);
