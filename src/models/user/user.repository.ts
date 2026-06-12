import { prisma } from "../../prisma/client";

export class UserRepository {
    async getAllUsers() {
        return prisma.user.findMany()
    }

    async getById(id: string) {
        return prisma.user.findUnique({
            where : {id}
        })
    }
}