import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import {registerSchema,loginSchema,changePassword} from "./auth.validation";

const authService = new AuthService();

export class AuthController {

    async register(req: Request, res: Response) {
        try {

            const body = registerSchema.parse(req.body);

            const result = await authService.register(
                body.email,
                body.password,
                body.name
            );

            return res.status(201).json(result);

        } catch (error: unknown) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Registration failed"
            });
        }
    }

    async login(req: Request, res: Response) {
        try {

            const body = loginSchema.parse(req.body);

            const result = await authService.login(
                body.email,
                body.password
            );

            return res.status(200).json(result);

        } catch (error: unknown) {

            if (error instanceof Error) {
                return res.status(401).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Login failed"
            });
        }
    }

    async google(req: Request, res: Response) {
        try {

            const { token } = req.body;

            if (!token) {
                return res.status(400).json({
                    message: "Token is required"
                });
            }

            const result = await authService.googleAuth(token);

            return res.status(200).json(result);

        } catch (error: unknown) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Google authentication failed"
            });
        }
    }

    async logout(req: Request, res: Response) {
        try {

            const user = (req as any).user;

            const result = await authService.logout(user.userId);

            return res.status(200).json(result);

        } catch (error: unknown) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Logout failed"
            });
        }
    }

    async changePassword(req: Request, res: Response) {
        try {

            const body = changePassword.parse(req.body);

            const user = (req as any).user;

            const result = await authService.changePassword(
                user.userId,
                body.currentPassword,
                body.newPassword
            );

            return res.status(200).json(result);

        } catch (error: unknown) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Password change failed"
            });
        }
    }
}