import { GoogleTokenVerify } from "../../utils/google";

describe("Google Utils", () => {
    it("should return fake payload", async () => {
        const payload = await GoogleTokenVerify("fake-google-token");

        expect(payload).not.toBeNull();
        expect(payload?.email).toBe("svyat@example.com");
        expect(payload?.name).toBe("Svyatoslav");
        expect(payload?.sub).toBe("1234567890");
    });
});