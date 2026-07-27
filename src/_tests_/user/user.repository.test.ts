import { UserRepository } from "../../models/user/user.repository";

describe("User Repository", () => {

    const repository = new UserRepository();

    it("should be defined", () => {
        expect(repository).toBeDefined();
    });

    it("should have getAllUsers method", () => {
        expect(typeof repository.getAllUsers).toBe("function");
    });

    it("should have getById method", () => {
        expect(typeof repository.getById).toBe("function");
    });

});