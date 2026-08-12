import { hashPassword, comparePassword } from "@/utils/bcrypt";
import bcrypt from "bcryptjs";

jest.mock("bcryptjs");

describe("Bcrypt Utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("hashPassword", () => {
    it("should hash password with bcrypt", async () => {
      const password = "test-password";
      const hashedPassword = "$2a$10$hashedvalue";

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await hashPassword(password);

      expect(result).toBe(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });

    it("should handle hashing errors", async () => {
      const password = "test-password";

      (bcrypt.hash as jest.Mock).mockRejectedValue(
        new Error("Hashing failed")
      );

      await expect(hashPassword(password)).rejects.toThrow("Hashing failed");
    });

    it("should use salt rounds of 10", async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");

      await hashPassword("test");

      expect(bcrypt.hash).toHaveBeenCalledWith("test", 10);
    });
  });

  describe("comparePassword", () => {
    it("should return true for matching passwords", async () => {
      const password = "test-password";
      const hash = "$2a$10$hashedvalue";

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await comparePassword(password, hash);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });

    it("should return false for non-matching passwords", async () => {
      const password = "test-password";
      const hash = "$2a$10$differenthashedvalue";

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await comparePassword(password, hash);

      expect(result).toBe(false);
    });

    it("should handle comparison errors", async () => {
      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error("Comparison failed")
      );

      await expect(
        comparePassword("test-password", "hash")
      ).rejects.toThrow("Comparison failed");
    });
  });
});
