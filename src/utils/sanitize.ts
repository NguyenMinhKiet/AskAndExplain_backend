// Using for delete all secret info
export function sanitizeResponse<T, K extends keyof T>(obj: T, ...fields: K[]): Omit<T, K> {
    const copy = { ...obj };
    for (const field of fields) {
        console.log('Field: ', field);
        delete copy[field];
    }
    console.log('Copy: ', copy);
    return copy;
}
