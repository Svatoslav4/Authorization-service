import { UserController } from "../../models/user/user.controller";

describe("User Controller", () => {

    const controller = new UserController();

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should have getUsers method", () => {
        expect(typeof controller.getUsers).toBe("function");
    });

});