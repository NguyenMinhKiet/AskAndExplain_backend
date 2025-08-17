import { logServices } from '../services/index.service.js';
export async function writeLog(data) {
    try {
        await logServices.create({
            ...data,
            createdAt: data.createdAt || new Date(),
        }, {});
    }
    catch (error) {
        console.error('Failed to write log:', error);
    }
}
//# sourceMappingURL=logger.js.map