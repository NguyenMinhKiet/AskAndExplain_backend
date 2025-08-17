import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';
export async function registerUser(email, password, name) {
    if (!email || !password)
        throw new BadRequestError(`Email and Password is required`);
    const existingUser = await User.findOne({ email });
    if (existingUser)
        throw new BadRequestError(`${email} is already registered`);
    const user = new User({ email, passwordHash: password, name });
    return user.save();
}
export async function validateUser(email, password) {
    if (!email || !password)
        throw new BadRequestError(`Email and Password is required`);
    const user = await User.findOne({ email });
    if (!user)
        throw new NotFoundError(`User with email "${email}" not found`);
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new BadRequestError('Invalid password');
    }
    return user;
}
//# sourceMappingURL=auth.service.js.map