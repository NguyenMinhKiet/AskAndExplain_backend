import bcrypt from 'bcrypt';

import { User, IUser } from '../models/user.model.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export async function registerUser(email: string, password: string, name?: string): Promise<IUser> {
    if (!email || !password) throw new BadRequestError(`Email and Password is required`);
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError(`${email} is already registered`);
    const user = new User({ email, passwordHash: password, name });
    return user.save();
}

export async function validateUser(email: string, password: string): Promise<IUser> {
    if (!email || !password) throw new BadRequestError(`Email and Password is required`);
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError(`User with email "${email}" not found`);
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new BadRequestError('Invalid password');
    }
    return user;
}
