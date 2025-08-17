import { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    passwordHash: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const userSchema: Schema<IUser, import("mongoose").Model<IUser, any, any, any, Document<unknown, any, IUser, any, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IUser, Document<unknown, {}, import("mongoose").FlatRecord<IUser>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<IUser> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=user.model.d.ts.map