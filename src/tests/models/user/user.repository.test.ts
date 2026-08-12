import { UserRepository } from "@/models/user/user.repository";
import { prisma } from "@/prisma/client";

jest.mock("@/prisma/client", () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe("UserRepository", () => {
  let userRepository: UserRepository;

  const mockUser = {
    id: "user-123",
    email: "test@example.com",
    password: "hashed-password",
    name: "Test User",
    refreshToken: null,
    avatar: null,
    googleId: null,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsers = [
    mockUser,
    {
      id: "user-456",
      email: "another@example.com",
      password: "hashed-password-2",
      name: "Another User",
      refreshToken: null,
      avatar: null,
      googleId: null,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = new UserRepository();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userRepository.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });

    it("should return empty array when no users exist", async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

      const result = await userRepository.getAllUsers();

      expect(result).toEqual([]);
    });

    it("should handle database errors", async () => {
      (prisma.user.findMany as jest.Mock).mockRejectedValue(
        new Error("Database connection error")
      );

      await expect(userRepository.getAllUsers()).rejects.toThrow(
        "Database connection error"
      );
    });
  });

  describe("getById", () => {
    it("should return user by id", async () => {
      const userId = "user-123";
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.getById(userId);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it("should return null when user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await userRepository.getById("non-existent-id");

      expect(result).toBeNull();
    });

    it("should handle database errors", async () => {
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database connection error")
      );

      await expect(userRepository.getById("user-123")).rejects.toThrow(
        "Database connection error"
      );
    });
  });
});
