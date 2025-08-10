import { Request, Response, NextFunction } from 'express';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../utils/errors.js';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error('Error handle: ', err); // log ra server

    if (err instanceof BadRequestError) {
        return res.status(400).json({ error: err.message });
    }

    if (err instanceof UnauthorizedError) {
        return res.status(401).json({ error: err.message });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.message });
    }

    // Lỗi không xác định
    return res.status(500).json({ error: 'Internal Server Error' });
}
