import { registerSchema, loginSchema } from "../../models/auth/auth.validation";

describe("Auth Validation", () => {

    describe("Register Schema", () => {

        it("should accept valid register data", () => {

            const data = {
                email: "test@gmail.com",
                password: "123456",
                name: "Svyat"
            };

            expect(() => registerSchema.parse(data)).not.toThrow();

        });

    });

});