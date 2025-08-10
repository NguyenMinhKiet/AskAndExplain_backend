import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

interface Payload {
    userId: string;
    email: string;
    name: string;
}

export function signToken(payload: Payload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): Payload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as Payload;
    } catch (err) {
        return null;
    }
}
