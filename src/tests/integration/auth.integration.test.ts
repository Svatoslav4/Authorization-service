import request from "supertest";
import { Role } from "@prisma/client";

import app from "@/app";
import { AuthService } from "@/models/auth/auth.service";

jest.mock("@/models/auth/auth.service");

describe("Authentication API", () => {
  const registerResult = {
    user: {
      id: "user-123",
      email: "integration@example.com",
      name: "Integration User",
      avatar: null,
      googleId: null,
      role: Role.User,
      emailVerified: false,
      emailVerifyToken: null,
      emailVerifyExpires: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    },
    accessToken: "access-token",
    refreshToken: "refresh-token",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("registers a user through the HTTP endpoint", async () => {
    (AuthService.prototype.register as jest.Mock).mockResolvedValue(
      registerResult
    );

    const response = await request(app)
      .post("/auth/register")
      .send({
        email: "integration@example.com",
        password: "password123",
        name: "Integration User",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      ...registerResult,
      user: {
        ...registerResult.user,
        createdAt: registerResult.user.createdAt.toISOString(),
      },
    });
    expect(AuthService.prototype.register).toHaveBeenCalledWith(
      "integration@example.com",
      "password123",
      "Integration User"
    );
  });

  it("rejects an invalid registration body before calling the service", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        email: "not-an-email",
        password: "short",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(AuthService.prototype.register).not.toHaveBeenCalled();
  });
});