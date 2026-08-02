import { prisma } from "../../prisma/client";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import {generateAccessToken,generateRefreshToken} from "../../utils/jwt";
import { GoogleTokenVerify } from "../../utils/google";

export class AuthService {

    async register(email: string, password: string, name: string) {

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        });

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    async login(email: string, password: string) {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user || !user.password) {
            throw new Error("Invalid credentials");
        }

        const validPassword = await comparePassword(
            password,
            user.password
        );

        if (!validPassword) {
            throw new Error("Invalid credentials");
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        });

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    async googleAuth(token: string) {

        const payload = await GoogleTokenVerify(token);

        if (!payload) {
            throw new Error("Google authorization failed");
        }

        if (!payload.email) {
            throw new Error("Google email not found");
        }

        if (!payload.sub) {
            throw new Error("Google ID not found");
        }

        if ("email_verified" in payload && !payload.email_verified) {
            throw new Error("Google email is not verified");
        }

        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        googleId: payload.sub
                    },
                    {
                        email: payload.email
                    }
                ]
            }
        });

        if (!user) {

            user = await prisma.user.create({
                data: {
                    email: payload.email,
                    name: payload.name || "User",
                    avatar: payload.picture,
                    googleId: payload.sub
                }
            });

        } else {

            user = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    googleId: payload.sub,
                    name: payload.name || user.name,
                    avatar: payload.picture || user.avatar
                }
            });

        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        });

        return {
            user,
            accessToken,
            refreshToken
        };
    }
}