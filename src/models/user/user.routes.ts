import { Router } from "express"
import { UserController } from "./user.controller"
import { authMiddleware } from "../../middlewares/auth.middleware"

const router = Router()

const controller = new UserController()
router.get("/",authMiddleware,controller.getUsers)

export default router