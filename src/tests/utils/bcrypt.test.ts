import { hashPassword, comparePassword } from "../../utils/bcrypt";

describe("Bcrypt Utils", () => {

    it("should hash password", async () => {

        const password = "123456";

        const hash = await hashPassword(password);

        expect(hash).not.toBe(password);
        expect(hash.length).toBeGreaterThan(20);

    });

    it("should compare valid password", async () => {

        const password = "123456";

        const hash = await hashPassword(password);

        const result = await comparePassword(password, hash);

        expect(result).toBe(true);

    });

    it("should reject invalid password", async () => {

        const password = "123456";

        const hash = await hashPassword(password);

        const result = await comparePassword("abcdef", hash);

        expect(result).toBe(false);

    });

});