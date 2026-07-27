import { AuthController } from "../../models/auth/auth.controller";

describe("Auth Controller", () => {
    const controller = new AuthController();

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should have register method", () => {
        expect(typeof controller.register).toBe("function");
    });

    it("should have login method", () => {
        expect(typeof controller.login).toBe("function");
    });

    it("should have google method", () => {
        expect(typeof controller.google).toBe("function");
    });
});