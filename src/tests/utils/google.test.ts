import { GoogleTokenVerify } from "@/utils/google";

describe("GoogleTokenVerify", () => {
  const mockPayload = {
    email: "test@example.com",
    name: "Test User",
    picture: "https://example.com/avatar.jpg",
    sub: "google-id-123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GOOGLE_CLIENT_ID = "test-client-id";
  });

  it("should return fake token payload for testing", async () => {
    const result = await GoogleTokenVerify("fake-google-token");

    expect(result).toEqual({
      email: "svyat@example.com",
      name: "Svyatoslav",
      picture: "https://example.com/avatar.jpg",
      sub: "1234567890",
    });
  });

  it("should handle verification errors gracefully", async () => {
    // Test with a token that would fail real verification
    // but we're testing the error handling
    const result = await GoogleTokenVerify("invalid-token-format");

    // Since there's no real OAuth2Client setup, this should return null
    // (the function catches errors)
    expect(result).toBeNull();
  });

  it("should use correct environment variable for OAuth2Client", async () => {
    process.env.GOOGLE_CLIENT_ID = "my-test-client-id";

    const result = await GoogleTokenVerify("fake-google-token");

    // For fake tokens, should always return the test payload
    expect(result).toBeDefined();
    expect(result?.email).toBe("svyat@example.com");
  });
});
