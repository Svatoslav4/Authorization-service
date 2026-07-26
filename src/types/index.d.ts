import "express";
import { AuthUser } from "../../models/auth/auth.types";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export {};