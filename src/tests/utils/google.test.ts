import { OAuth2Client } from "google-auth-library";

const mockVerifyIdToken = jest.fn();

jest.mock("google-auth-library", () => ({
  OAuth2Client: jest.fn().mockImplementation(() => ({
    verifyIdToken: mockVerifyIdToken,
  })),
}));

import { GoogleTokenVerify } from "@/utils/google";

describe("GoogleTokenVerify", () => {
  const mockPayload = {
    email: "svyat@example.com",
    name: "Svyatoslav",
    picture: "https://example.com/avatar.jpg",
    sub: "1234567890",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.GOOGLE_CLIENT_ID = "test-client-id";
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return Google token payload", async () => {
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => mockPayload,
    });

    const result = await GoogleTokenVerify("fake-google-token");

    expect(result).toEqual(mockPayload);

    expect(mockVerifyIdToken).toHaveBeenCalledWith({
      idToken: "fake-google-token",
      audience: "test-client-id",
    });
  });

  it("should return null when verification fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    mockVerifyIdToken.mockRejectedValue(
      new Error("Google verification failed")
    );

    const result = await GoogleTokenVerify("invalid-token");

    expect(result).toBeNull();

    expect(console.error).toHaveBeenCalled();
  });

  it("should use GOOGLE_CLIENT_ID", async () => {
    process.env.GOOGLE_CLIENT_ID = "my-test-client-id";

    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => mockPayload,
    });

    const result = await GoogleTokenVerify("fake-google-token");

    expect(result).toEqual(mockPayload);

    expect(mockVerifyIdToken).toHaveBeenCalledWith({
      idToken: "fake-google-token",
      audience: "my-test-client-id",
    });
  });
});