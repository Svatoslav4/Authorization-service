import { UserRepository } from "./user.repository";

export class UserService {
    private repository: UserRepository;

    constructor(repository?: UserRepository) {
        this.repository = repository || new UserRepository();
    }

    async getUsers() {
        return this.repository.getAllUsers();
    }
}
