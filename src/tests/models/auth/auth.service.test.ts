import { AuthService } from "@/models/auth/auth.service";
import { prisma } from "@/prisma/client";
import * as bcryptUtils from "@/utils/bcrypt";
import * as jwtUtils from "@/utils/jwt";
import * as googleUtils from "@/utils/google";

jest.mock("@/prisma/client", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));
jest.mock("@/utils/bcrypt");
jest.mock("@/utils/jwt");
jest.mock("@/utils/google");

describe("AuthService", () => {
  let authService: AuthService;

  const mockUser = {
    id: "user-123",
    email: "test@example.com",
    password: "hashed-password",
    name: "Test User",
    refreshToken: "hashed-refresh-token",
    avatar: null,
    googleId: null,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService();
  });

  describe("register", () => {
    it("should successfully register a new user", async () => {
      const email = "newuser@example.com";
      const password = "password123";
      const name = "New User";

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcryptUtils.hashPassword as jest.Mock).mockResolvedValue("hashed-password");
      (prisma.user.create as jest.Mock).mockResolvedValue({
        ...mockUser,
        email,
        name,
      });
      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.register(email, password, name);

      expect(result.user.email).toBe(email);
      expect(result.user.name).toBe(name);
      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");
    });

    it("should throw error if user already exists", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        authService.register("existing@example.com", "password123", "Test")
      ).rejects.toThrow("User already exists");
    });
  });

  describe("login", () => {
    it("should successfully login user with correct credentials", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcryptUtils.comparePassword as jest.Mock).mockResolvedValue(true);
      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.login("test@example.com", "password123");

      expect(result.user.email).toBe("test@example.com");
      expect(result.accessToken).toBe("access-token");
    });

    it("should throw error if user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login("unknown@example.com", "password123")
      ).rejects.toThrow("Invalid credentials");
    });

    it("should throw error if password is incorrect", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcryptUtils.comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login("test@example.com", "wrongpassword")
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("googleAuth", () => {
    it("should create new user on first Google auth", async () => {
      const token = "google-token";
      const payload = {
        email: "google@example.com",
        sub: "google-id-123",
        name: "Google User",
        picture: "https://example.com/avatar.jpg",
      };

      (googleUtils.GoogleTokenVerify as jest.Mock).mockResolvedValue(payload);
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue({
        ...mockUser,
        email: payload.email,
        googleId: payload.sub,
      });
      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.googleAuth(token);

      expect(result.user.email).toBe(payload.email);
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it("should throw error if Google verification fails", async () => {
      (googleUtils.GoogleTokenVerify as jest.Mock).mockResolvedValue(null);

      await expect(authService.googleAuth("invalid-token")).rejects.toThrow(
        "Google authorization failed"
      );
    });
  });

  describe("logout", () => {
    it("should successfully logout user", async () => {
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.logout("user-123");

      expect(result.message).toBe("Logged out successfully");
    });
  });

  describe("changePassword", () => {
    it("should successfully change password", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcryptUtils.comparePassword as jest.Mock).mockResolvedValue(true);
      (bcryptUtils.hashPassword as jest.Mock).mockResolvedValue("hashed-new-password");
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.changePassword(
        "user-123",
        "old-password",
        "new-password"
      );

      expect(result.message).toContain("Password changed successfully");
    });

    it("should throw error if user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.changePassword("user-123", "old-password", "new-password")
      ).rejects.toThrow("User not found");
    });
  });
});
