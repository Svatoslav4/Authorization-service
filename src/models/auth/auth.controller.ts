import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { registerSchema,loginSchema } from "./auth.validation";

const authService = new AuthService()

export class AuthController {
    async register(req: Request,res: Response,) {
       try {
        const body = registerSchema.parse(req.body)
        
        const user = await authService.register(
            body.email,
            body.password,
            body.name
        )
        
        res.json(user)
       } 
        
       catch (e) {
        res.status(400).json({message: (e as Error).message})
       }
       
        
    }


    async login(req: Request, res: Response) {
        try {
            const body = loginSchema.parse(req.body)
            const data = await authService.login(
                body.email,
                body.password
            )

            res.json(data)
        } catch (e) {
            res.status(400).json({ message: (e as Error).message })
        }
    }


    async google(req: Request, res: Response) {
        try {
            const {token} = req.body
            const data = authService.googleAuth(token)
            res.json(data)
        }

        catch (e) {
            res.status(400).json({message: (e as Error).message})
        }
    }
}