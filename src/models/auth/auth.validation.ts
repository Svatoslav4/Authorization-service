import { z } from "zod"

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2)
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const changePassword = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8)
})