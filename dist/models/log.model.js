import mongoose, { Schema, model } from 'mongoose';
export const logSchema = new Schema({
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
export const Log = model('Log', logSchema);
//# sourceMappingURL=log.model.js.map