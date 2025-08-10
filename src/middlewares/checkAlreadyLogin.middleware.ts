import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { BadRequestError } from '../utils/errors.js';

export default function checkAlreadyLogin(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1] as string;
        try {
            const user = verifyToken(token);
            console.log('User check: ', user);
            if (user) return next(new BadRequestError('You are already logged in'));
        } catch {
            // token không hợp lệ => next()
        }
    }
    next();
}
