import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwt_password = process.env.JWT_PASSWORD!;
if (!jwt_password) {
    throw new Error("JWT_PASSWORD is not configured");
};

export function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, jwt_password)

        if (typeof decoded === "string" || !decoded.name) {
            return res.status(401).json({ message: "Invalid token" });
        };

        req.userId = decoded.name;
        next();
        } catch {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
} 