import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService()

export class UserController {
   async getUsers(req: Request, res: Response) {
        const users = await userService.getUsers()
        res.json(users)
   } 
}