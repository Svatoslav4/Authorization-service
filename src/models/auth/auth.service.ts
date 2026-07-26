import { prisma } from '../../prisma/client'
import { hashPassword, comparePassword } from '../../utils/bcrypt' 
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt'
import { GoogleTokenVerify } from '../../utils/google'

export class AuthService {
    async register(email: string, password: string, name: string) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await hashPassword(password);
        return await prisma.user.create({
            data: { email, password: hashedPassword, name }
        });
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) throw new Error('Invalid credentials');

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) throw new Error('Invalid credentials');
        
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });

        return { user, accessToken, refreshToken };
    }

    async googleAuth(token: string) {
        const payload = await GoogleTokenVerify(token);
        if (!payload?.email) throw new Error('Google authorization failed');

        
        let user = await prisma.user.findUnique({ where: { email: payload.email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: payload.email,
                    name: payload.name || "User",
                    avatar: payload.picture,
                    googleId: payload.sub,
                }
            });
        } else if (!user.googleId) {
            user = await prisma.user.update({
                where: { id: user.id },
                data: { googleId: payload.sub }
            });
        }
        
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });

        return { user, accessToken, refreshToken };
    }
}