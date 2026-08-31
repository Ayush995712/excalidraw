import jwt from "jsonwebtoken";

export function extractToken(header: string | undefined): string | undefined {
    if (!header || !header?.startsWith("Bearer ")) {
        return undefined;
    };

    const token = header?.split(" ")[1];
    if (!token) {
        return undefined;
    };

    return token;
};

interface AuthResult {
    valid: boolean;
    userId?: string;
}

export function checkAuth(token: string, jwtSecret: string): AuthResult {
    if (!token) { return { valid : false }};

    try {
        let decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === "string" || !decoded?.userId) {
            return { valid: false }
        };

        return { valid: true, userId: decoded.userId as string };
    } catch (e) {
        return { valid: false }
    }
}