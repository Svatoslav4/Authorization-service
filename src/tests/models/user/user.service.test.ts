import { UserService } from "@/models/user/user.service";
import { UserRepository } from "@/models/user/user.repository";

jest.mock("@/models/user/user.repository");

describe("UserService", () => {
  let userService: UserService;

  const mockUsers = [
    {
      id: "user-1",
      email: "user1@example.com",
      password: "hashed-password-1",
      name: "User One",
      refreshToken: null,
      avatar: null,
      googleId: null,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "user-2",
      email: "user2@example.com",
      password: "hashed-password-2",
      name: "User Two",
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
  });

  describe("getUsers", () => {
    it("should return all users from repository", async () => {
      const mockGetAllUsers = jest.fn().mockResolvedValue(mockUsers);
      (UserRepository as any).mockImplementation(() => ({
        getAllUsers: mockGetAllUsers,
      }));

      userService = new UserService();
      const result = await userService.getUsers();

      expect(result).toEqual(mockUsers);
      expect(mockGetAllUsers).toHaveBeenCalled();
    });

    it("should return empty array when no users exist", async () => {
      const mockGetAllUsers = jest.fn().mockResolvedValue([]);
      (UserRepository as any).mockImplementation(() => ({
        getAllUsers: mockGetAllUsers,
      }));

      userService = new UserService();
      const result = await userService.getUsers();

      expect(result).toEqual([]);
      expect(mockGetAllUsers).toHaveBeenCalled();
    });

    it("should handle repository errors", async () => {
      const mockGetAllUsers = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      (UserRepository as any).mockImplementation(() => ({
        getAllUsers: mockGetAllUsers,
      }));

      userService = new UserService();

      await expect(userService.getUsers()).rejects.toThrow("Database error");
    });
  });
});
