import { UserController } from "@/models/user/user.controller";
import { UserService } from "@/models/user/user.service";
import { Request, Response } from "express";

jest.mock("@/models/user/user.service");

describe("UserController", () => {
  let userController: UserController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    userController = new UserController();
    req = {};
    res = {
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      const mockUsers = [
        { id: "1", email: "user1@example.com", name: "User 1" },
        { id: "2", email: "user2@example.com", name: "User 2" },
      ];

      const mockGetUsers = jest.fn().mockResolvedValue(mockUsers);
      (UserService as any).mockImplementation(() => ({
        getUsers: mockGetUsers,
      }));

      userController = new UserController();
      await userController.getUsers(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it("should handle empty users list", async () => {
      const mockGetUsers = jest.fn().mockResolvedValue([]);
      (UserService as any).mockImplementation(() => ({
        getUsers: mockGetUsers,
      }));

      userController = new UserController();
      await userController.getUsers(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith([]);
    });

    it("should handle service errors", async () => {
      const mockGetUsers = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      (UserService as any).mockImplementation(() => ({
        getUsers: mockGetUsers,
      }));

      userController = new UserController();

      await expect(
        userController.getUsers(req as Request, res as Response)
      ).rejects.toThrow("Database error");
    });
  });
});
