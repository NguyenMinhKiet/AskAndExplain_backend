import { writeLog } from '../utils/logger.js';
export default function logMiddleware(resource) {
    const messagesMap = {
        GET: `Performed GET on ${resource}`,
        POST: `Performed POST on ${resource}`,
        PUT: `Performed UPDATE on ${resource}`,
        DELETE: `Performed DELETE on ${resource}`,
    };
    return async (req, res, next) => {
        const originalJson = res.json;
        res.json = function (body) {
            const userId = req.user?.userId;
            // Only write log when user login
            if (!userId)
                return originalJson.call(this, body);
            const resourceId = req.params.id || null;
            const routePath = req.route?.path || '';
            const method = req.method;
            const actionKey = routePath || method;
            const status = res.statusCode >= 200 && res.statusCode < 400 ? 'success' : 'fail';
            const errorMessage = status === 'fail' && body?.errorMessage ? body.errorMessage : undefined;
            const message = messagesMap[actionKey] || `Performed ${method} on ${resource}`;
            writeLog({
                userId,
                action: actionKey,
                resource,
                resourceId,
                ip: req.ip,
                message,
                status,
                errorMessage,
            });
            return originalJson.call(this, body);
        };
        next();
    };
}
//# sourceMappingURL=log.middleware.js.map