import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;
if (!jwtSecret) {
    throw new Error("jwtSecret is not configured");
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
        const decoded = jwt.verify(token, jwtSecret)

        if (typeof decoded === "string" || !decoded.id) {
            return res.status(401).json({ message: "Invalid token" });
        };

        req.userId = decoded.id;
        next();
        } catch {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
} 