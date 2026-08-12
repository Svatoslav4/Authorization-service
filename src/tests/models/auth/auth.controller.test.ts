import { AuthController } from "@/models/auth/auth.controller";
import { AuthService } from "@/models/auth/auth.service";
import { Request, Response } from "express";
import { Role } from "@prisma/client";

jest.mock("@/models/auth/auth.service");

describe("AuthController", () => {
  let authController: AuthController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  const createMockUser = (overrides = {}) => ({
    id: "123",
    email: "test@example.com",
    name: "Test User",
    avatar: null,
    googleId: null,
    role: Role.User,
    emailVerified: false,
    emailVerifyToken: null,
    emailVerifyExpires: null,
    createdAt: new Date(),
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    authController = new AuthController();

    req = {
      body: {},
      headers: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("register", () => {
    it("should register user successfully", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      };

      const mockResult = {
        user: createMockUser(),
        accessToken: "token",
        refreshToken: "refresh",
      };

      (
        AuthService.prototype.register as jest.Mock
      ).mockResolvedValue(mockResult);

      await authController.register(
        req as Request,
        res as Response
      );

      expect(
        AuthService.prototype.register
      ).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
        "Test User"
      );

      expect(res.status).toHaveBeenCalledWith(201);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("should return 400 for validation error", async () => {
      req.body = {
        email: "invalid-email",
        password: "123",
      };

      await authController.register(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 for service error", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        name: "Test",
      };

      (
        AuthService.prototype.register as jest.Mock
      ).mockRejectedValue(
        new Error("Server error")
      );

      await authController.register(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
      });
    });
  });

  describe("login", () => {
    it("should login user successfully", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
      };

      const mockResult = {
        user: createMockUser(),
        accessToken: "token",
        refreshToken: "refresh",
      };

      (
        AuthService.prototype.login as jest.Mock
      ).mockResolvedValue(mockResult);

      await authController.login(
        req as Request,
        res as Response
      );

      expect(
        AuthService.prototype.login
      ).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("should return 401 for invalid credentials", async () => {
      req.body = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      (
        AuthService.prototype.login as jest.Mock
      ).mockRejectedValue(
        new Error("Invalid credentials")
      );

      await authController.login(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });
  });

  describe("google", () => {
    it("should authenticate with Google token", async () => {
      req.body = {
        token: "google-token",
      };

      const mockResult = {
        user: createMockUser({
          email: "google@example.com",
          name: "Google User",
        }),
        accessToken: "token",
        refreshToken: "refresh",
      };

      (
        AuthService.prototype.googleAuth as jest.Mock
      ).mockResolvedValue(mockResult);

      await authController.google(
        req as Request,
        res as Response
      );

      expect(
        AuthService.prototype.googleAuth
      ).toHaveBeenCalledWith("google-token");

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("should return 400 if token is missing", async () => {
      req.body = {};

      await authController.google(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Token is required",
      });
    });
  });

  describe("logout", () => {
    it("should logout user successfully", async () => {
      (req as any).user = {
        userId: "user-123",
      };

      const mockResult = {
        message: "Logged out successfully",
      };

      (
        AuthService.prototype.logout as jest.Mock
      ).mockResolvedValue(mockResult);

      await authController.logout(
        req as Request,
        res as Response
      );

      expect(
        AuthService.prototype.logout
      ).toHaveBeenCalledWith("user-123");

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });
});
