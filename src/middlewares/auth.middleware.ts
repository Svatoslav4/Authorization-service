import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request,res: Response,next: NextFunction) => { 
    const authHeader = req.headers.authorization

    if(!authHeader || !/^Bearer\s+\S+$/.test(authHeader)) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const token = authHeader.replace(/^Bearer\s+/, "")

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as jwt.JwtPayload;

        if (typeof decoded !== "object" || typeof decoded.userId !== "string") {
            return res.status(401).json({message: "Invalid Token"})
        }

        (req).user = decoded;
        next();
    } catch {
        return res.status(401).json({message: "Invalid Token"})
    }
}