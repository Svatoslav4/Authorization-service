import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

describe("JWT Utils", () => {

    beforeAll(() => {
        process.env.JWT_ACCESS_SECRET = "access-secret";
        process.env.JWT_REFRESH_SECRET = "refresh-secret";
    });

    it("should generate access token", () => {

        const token = generateAccessToken("123");

        expect(token).toBeDefined();

    });

    it("should generate refresh token", () => {

        const token = generateRefreshToken("123");

        expect(token).toBeDefined();

    });

    it("should verify access token", () => {

        const token = generateAccessToken("123");

        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET!
        ) as jwt.JwtPayload;

        expect(decoded.userId).toBe("123");

    });

    it("should verify refresh token", () => {

        const token = generateRefreshToken("123");

        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET!
        ) as jwt.JwtPayload;

        expect(decoded.userId).toBe("123");

    });

});