import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validation";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const body = registerSchema.parse(req.body);
            const user = await authService.register(body.email, body.password, body.name);
            res.status(201).json(user);
        } catch (e: any) {
            res.status(400).json({ message: e.message || "Registration failed" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const body = loginSchema.parse(req.body);
            const data = await authService.login(body.email, body.password);
            res.json(data);
        } catch (e: any) {
            res.status(401).json({ message: e.message || "Login failed" });
        }
    }

    async google(req: Request, res: Response) {
        try {
            const { token } = req.body;
            if (!token) throw new Error("Token is required");
            
            const data = await authService.googleAuth(token);
            res.json(data);
        } catch (e: any) {
            res.status(400).json({ message: e.message || "Google auth failed" });
        }
    }
}