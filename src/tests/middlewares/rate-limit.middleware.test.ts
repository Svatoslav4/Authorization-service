jest.mock("express-rate-limit", () => ({
  __esModule: true,
  default: jest.fn(() => jest.fn()),
}));

import rateLimit from "express-rate-limit";
import { authLimiter } from "@/middlewares/rate-limit.middleware";

describe("Rate Limit Middleware", () => {
  it("should create rate limiter with correct configuration", () => {
    expect(rateLimit).toHaveBeenCalledWith({
      windowMs: 15 * 60 * 1000,
      max: 5,
      message: {
        message: "Too many requests. Please try again later",
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
  });

  it("should set window time to 15 minutes", () => {
    const callArgs = (rateLimit as jest.Mock).mock.calls[0][0];
    expect(callArgs.windowMs).toBe(15 * 60 * 1000);
  });

  it("should set max requests to 5", () => {
    const callArgs = (rateLimit as jest.Mock).mock.calls[0][0];
    expect(callArgs.max).toBe(5);
  });

  it("should have correct error message", () => {
    const callArgs = (rateLimit as jest.Mock).mock.calls[0][0];
    expect(callArgs.message.message).toBe(
      "Too many requests. Please try again later"
    );
  });

  it("should enable standard headers", () => {
    const callArgs = (rateLimit as jest.Mock).mock.calls[0][0];
    expect(callArgs.standardHeaders).toBe(true);
  });

  it("should disable legacy headers", () => {
    const callArgs = (rateLimit as jest.Mock).mock.calls[0][0];
    expect(callArgs.legacyHeaders).toBe(false);
  });

  it("should export authLimiter as middleware function", () => {
    expect(typeof authLimiter).toBe("function");
  });
});