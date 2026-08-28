import { authMiddleware } from "@/middlewares/auth.middleware";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("authMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should return 401 if no authorization header", () => {
    req.headers = {};

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should extract token from Bearer header", () => {
    const token = "valid-token";
    const decodedToken = { userId: "user-123" };

    req.headers = { authorization: `Bearer ${token}` };
    (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

    authMiddleware(req as Request, res as Response, next);

    expect(jwt.verify).toHaveBeenCalledWith(
      token,
      process.env.JWT_ACCESS_SECRET
    );
  });

  it.each(["Basic valid-token", "Bearer", "Bearer   ", "valid-token"])(
    "should reject malformed authorization header: %s",
    (authorization) => {
      req.headers = { authorization };

      authMiddleware(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(jwt.verify).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    }
  );

  it("should reject a token without a user id", () => {
    req.headers = { authorization: "Bearer valid-token" };
    (jwt.verify as jest.Mock).mockReturnValue({ role: "User" });

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid Token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should attach decoded token to request user object", () => {
    const token = "valid-token";
    const decodedToken = { userId: "user-123", iat: 1234567890 };

    req.headers = { authorization: `Bearer ${token}` };
    (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

    authMiddleware(req as Request, res as Response, next);

    expect((req as any).user).toEqual(decodedToken);
  });

  it("should call next() when token is valid", () => {
    const token = "valid-token";
    const decodedToken = { userId: "user-123" };

    req.headers = { authorization: `Bearer ${token}` };
    (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

    authMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    const token = "invalid-token";

    req.headers = { authorization: `Bearer ${token}` };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid Token" });
    expect(next).not.toHaveBeenCalled();
  });
});
