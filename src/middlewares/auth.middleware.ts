import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Need Login to do this Action' });
    }

    const token = authHeader.split(' ')[1] as string;

    try {
        const decoded = verifyToken(token) as { userId: string; email: string; name: string };
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
