import { authMiddleware } from "../../middlewares/auth.middleware";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

        process.env.JWT_ACCESS_SECRET = "secret";
    });

    it("should return 401 if authorization header is missing", () => {
        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "Unauthorized"
        });
    });

    it("should return 401 if token is invalid", () => {
        req.headers = {
            authorization: "Bearer invalidToken"
        };

        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid");
        });

        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "Invalid Token"
        });
    });

    it("should call next if token is valid", () => {
        req.headers = {
            authorization: "Bearer validToken"
        };

        (jwt.verify as jest.Mock).mockReturnValue({
            id: "123",
            email: "test@gmail.com"
        });

        authMiddleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
    });

    it("should attach decoded user to request", () => {
        req.headers = {
            authorization: "Bearer validToken"
        };

        const decoded = {
            id: "123",
            email: "test@gmail.com"
        };

        (jwt.verify as jest.Mock).mockReturnValue(decoded);

        authMiddleware(req as Request, res as Response, next);

        expect((req as any).user).toEqual(decoded);
    });
});