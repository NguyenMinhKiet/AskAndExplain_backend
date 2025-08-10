import bcrypt from 'bcrypt';

import { User, IUser } from '../models/user.model.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export async function registerUser(email: string, password: string, name?: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError(`${email} is already registered`);
    const user = new User({ email, passwordHash: password, name });
    return user.save();
}

export async function validateUser(email: string, password: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError(`User with email "${email}" not found`);
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new BadRequestError('Invalid password');
    }
    return user;
}

// export async function getUsers(): Promise<IUser[]> {
//     const users = await User.find().select('-passwordHash');
//     return users;
// }

// export async function getUser(_id: string, email?: string): Promise<IUser> {
//     const query: Record<string, unknown> = { _id };
//     if (email) {
//         query.email = email;
//     }
//     const user = await User.findOne(query).select('-passwordHash');
//     if (!user) throw new NotFoundError('No user found');

//     return user;
// }

// export async function updateUser(
//     _id: string,
//     email?: string,
//     password?: string,
//     name?: string,
//     role?: string,
// ): Promise<IUser> {
//     const user = await User.findById(_id);
//     if (!user) throw new NotFoundError('User not found');

//     if (email) user.email = email;
//     if (password) user.passwordHash = password;
//     if (name) user.name = name;
//     if (role) user.role = role;

//     await user.save();
//     return user;
// }

// export async function deleteUser(_id: string): Promise<IUser> {
//     const result = await User.findByIdAndDelete(_id);
//     if (!result) throw new NotFoundError(`User not found`);
//     return result;
// }
