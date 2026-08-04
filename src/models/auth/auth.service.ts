import { prisma } from "../../prisma/client";
import { User } from "@prisma/client";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { GoogleTokenVerify } from "../../utils/google";
import {generateAccessToken,generateRefreshToken} from "../../utils/jwt";

export class AuthService {

    private async createTokens(userId: string) {
        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        const hashedRefreshToken = await hashPassword(refreshToken);

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: hashedRefreshToken
            }
        });

        return {accessToken,refreshToken};
    }

    private sanitizeUser(user: User) {
        const {password,refreshToken,...safeUser} = user;

        return safeUser;
    }

    async register(email: string,password: string,name: string) {

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

        const tokens = await this.createTokens(user.id);

        return {user: this.sanitizeUser(user),...tokens};
    }

    async login(email: string,password: string) {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user || !user.password) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const tokens = await this.createTokens(user.id);

        return {user: this.sanitizeUser(user),...tokens};
    }

    async googleAuth(token: string) {

        const payload = await GoogleTokenVerify(token);

        if (!payload?.email || !payload.sub) {
            throw new Error("Google authorization failed");
        }

        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: payload.email
                    },
                    {
                        googleId: payload.sub
                    }
                ]
            }
        });

        if (!user) {

            user = await prisma.user.create({
                data: {
                    email: payload.email,
                    name: payload.name ?? "User",
                    avatar: payload.picture,
                    googleId: payload.sub
                }
            });

        } else if (!user.googleId) {

            user = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    googleId: payload.sub,
                    name: payload.name ?? user.name,
                    avatar: payload.picture ?? user.avatar
                }
            });
        }

        const tokens = await this.createTokens(user.id);

        return {
            user: this.sanitizeUser(user),
            ...tokens
        };
    }

    async logout(userId: string) {

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: null
            }
        });

        return {
            message: "Logged out successfully"
        };
    }

    async changePassword(userId: string,currentPassword: string,newPassword: string) {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user || !user.password) {
            throw new Error("User not found");
        }

        const isPasswordValid = await comparePassword(currentPassword,user.password);

        if (!isPasswordValid) {
            throw new Error("Current password is incorrect");
        }

        const hashedPassword = await hashPassword(newPassword);

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword,
                refreshToken: null
            }
        });

        return {
            message: "Password changed successfully. Please login again."
        };
    }
}