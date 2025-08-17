import * as authService from '../services/auth.service.js';
import { signToken } from '../utils/jwt.js';
export async function register(req, res, next) {
    try {
        const { email, password, name } = req.body;
        const user = await authService.registerUser(email, password, name);
        // create jwt token after register to login
        const token = signToken({ userId: user._id, email: user.email, name: user.name });
        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await authService.validateUser(email, password);
        const token = signToken({ userId: user._id, email: user.email, name: user.name });
        res.json({ message: 'Login successfully', token });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=auth.controller.js.map