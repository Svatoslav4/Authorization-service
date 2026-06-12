import { UserRepository } from "./user.repository";

const repository = new UserRepository()

export class UserService {
    async getUsers() {
        return repository.getAllUsers()
    }
}
