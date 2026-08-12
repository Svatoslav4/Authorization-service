import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("JWT Utils", () => {
  const userId = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_ACCESS_SECRET = "access-secret-key";
    process.env.JWT_REFRESH_SECRET = "refresh-secret-key";
  });

  describe("generateAccessToken", () => {
    it("should generate access token with user id", () => {
      const mockToken = "access-token-123";

      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const token = generateAccessToken(userId);

      expect(token).toBe(mockToken);
    });

    it("should sign token with correct payload", () => {
      (jwt.sign as jest.Mock).mockReturnValue("token");

      generateAccessToken(userId);

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15w" }
      );
    });

    it("should set expiration to 15 weeks", () => {
      (jwt.sign as jest.Mock).mockReturnValue("token");

      generateAccessToken(userId);

      const callArgs = (jwt.sign as jest.Mock).mock.calls[0];
      expect(callArgs[2].expiresIn).toBe("15w");
    });
  });

  describe("generateRefreshToken", () => {
    it("should generate refresh token with user id", () => {
      const mockToken = "refresh-token-456";

      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const token = generateRefreshToken(userId);

      expect(token).toBe(mockToken);
    });

    it("should sign token with correct payload", () => {
      (jwt.sign as jest.Mock).mockReturnValue("token");

      generateRefreshToken(userId);

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "30d" }
      );
    });

    it("should set expiration to 30 days", () => {
      (jwt.sign as jest.Mock).mockReturnValue("token");

      generateRefreshToken(userId);

      const callArgs = (jwt.sign as jest.Mock).mock.calls[0];
      expect(callArgs[2].expiresIn).toBe("30d");
    });
  });

  describe("Token generation flow", () => {
    it("should generate different tokens for same user", () => {
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce("access-token-1")
        .mockReturnValueOnce("refresh-token-1");

      const accessToken = generateAccessToken(userId);
      const refreshToken = generateRefreshToken(userId);

      expect(accessToken).not.toBe(refreshToken);
    });
  });
});
