export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
    }
}
export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
//# sourceMappingURL=errors.js.map