import  express from "express";
import { Router } from "express";


const router = Router();

const authService = new AuthService()
const authController = new AuthController(authService)

router.post('/register',authController.register)
router.post('login',authService.login)

export default router