import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { authMiddleware } from "../../middlewares/auth.middleware";

jest.mock("jsonwebtoken", () => ({
    __esModule: true,
    default: {
        verify: jest.fn(),
    },
}));

describe("Auth Middleware", () => {
    let req: Partial<Request>;
    let res: {
        status: jest.Mock;
        json: jest.Mock;
    };
    let next: jest.Mock;

    const verifyMock = jwt.verify as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            headers: {},
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();

        process.env.JWT_ACCESS_SECRET = "secret";
    });

    describe("Authorization header", () => {
        it("should return 401 if authorization header is missing", () => {
            authMiddleware(
                req as Request,
                res as unknown as Response,
                next as unknown as NextFunction
            );

            expect(res.status).toHaveBeenCalledWith(401);

            expect(res.json).toHaveBeenCalledWith({
                message: "Unauthorized",
            });

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("Invalid token", () => {
        it("should return 401 if token is invalid", () => {
            req.headers = {
                authorization: "Bearer invalidToken",
            };

            verifyMock.mockImplementation(() => {
                throw new Error("Invalid token");
            });

            authMiddleware(
                req as Request,
                res as unknown as Response,
                next as unknown as NextFunction
            );

            expect(res.status).toHaveBeenCalledWith(401);

            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid Token",
            });

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("Valid token", () => {
        it("should call next if token is valid", () => {
            req.headers = {
                authorization: "Bearer validToken",
            };

            const decoded = {
                userId: "123",
            };

            verifyMock.mockReturnValue(decoded);

            authMiddleware(
                req as Request,
                res as unknown as Response,
                next as unknown as NextFunction
            );

            expect(verifyMock).toHaveBeenCalledWith(
                "validToken",
                "secret"
            );

            expect(next).toHaveBeenCalledTimes(1);
        });

        it("should attach decoded user to request", () => {
            req.headers = {
                authorization: "Bearer validToken",
            };

            const decoded = {
                userId: "123",
            };

            verifyMock.mockReturnValue(decoded);

            authMiddleware(
                req as Request,
                res as unknown as Response,
                next as unknown as NextFunction
            );

            expect(req.user).toEqual(decoded);

            expect(next).toHaveBeenCalledTimes(1);
        });

        it("should extract Bearer token correctly", () => {
            req.headers = {
                authorization: "Bearer myAccessToken",
            };

            verifyMock.mockReturnValue({
                userId: "123",
            });

            authMiddleware(
                req as Request,
                res as unknown as Response,
                next as unknown as NextFunction
            );

            expect(verifyMock).toHaveBeenCalledWith(
                "myAccessToken",
                "secret"
            );

            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});