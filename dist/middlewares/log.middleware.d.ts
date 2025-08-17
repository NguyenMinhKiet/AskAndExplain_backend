import { NextFunction, Request, Response } from 'express';
export default function logMiddleware(resource: string): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=log.middleware.d.ts.map