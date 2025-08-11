import { ILog } from '../models/log.model.js';
import { logServices } from '../services/index.service.js';

export async function writeLog(data: ILog) {
    try {
        await logServices.create(
            {
                ...data,
                createdAt: data.createdAt || new Date(),
            },
            {},
        );
    } catch (error) {
        console.error('Failed to write log:', error);
    }
}
