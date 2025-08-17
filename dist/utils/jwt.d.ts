export interface Payload {
    userId: string;
    email?: string;
    name?: string;
}
export declare function signToken(payload: Payload): string;
export declare function verifyToken(token: string): Payload | null;
//# sourceMappingURL=jwt.d.ts.map