import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
    private userService: UserService;

    constructor(userService?: UserService) {
        this.userService = userService || new UserService();
    }

    async getUsers(req: Request, res: Response) {
        const users = await this.userService.getUsers();
        res.json(users);
    }
}