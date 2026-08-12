import { UserService } from "../../models/user/user.service";

describe("User Service", () => {

    const service = new UserService();

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should have getUsers method", () => {
        expect(typeof service.getUsers).toBe("function");
    });

});