import { verifyToken } from '../utils/jwt.js';
import { BadRequestError } from '../utils/errors.js';
export default function checkAlreadyLogin(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const user = verifyToken(token);
            console.log('User check: ', user);
            if (user)
                return next(new BadRequestError('You are already logged in'));
        }
        catch {
            // token không hợp lệ => next()
        }
    }
    next();
}
//# sourceMappingURL=checkAlreadyLogin.middleware.js.map