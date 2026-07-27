import { AuthService } from "../../models/auth/auth.service";

describe("Auth Service", () => {

    const service = new AuthService();

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should have register()", () => {
        expect(typeof service.register).toBe("function");
    });

    it("should have login()", () => {
        expect(typeof service.login).toBe("function");
    });

    it("should have googleAuth()", () => {
        expect(typeof service.googleAuth).toBe("function");
    });

});