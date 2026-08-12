import { registerSchema, loginSchema, changePassword } from "@/models/auth/auth.validation";

describe("Auth Validation Schemas", () => {
  describe("registerSchema", () => {
    it("should validate correct registration data", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      };

      const result = registerSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
        name: "Test User",
      };

      const result = registerSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject short password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "123",
        name: "Test User",
      };

      const result = registerSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject short name", () => {
      const invalidData = {
        email: "test@example.com",
        password: "password123",
        name: "T",
      };

      const result = registerSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject missing fields", () => {
      const invalidData = {
        email: "test@example.com",
      };

      const result = registerSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe("loginSchema", () => {
    it("should validate correct login data", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject short password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "123",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject missing fields", () => {
      const invalidData = {
        email: "test@example.com",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe("changePassword", () => {
    it("should validate correct password change data", () => {
      const validData = {
        currentPassword: "password123",
        newPassword: "newpassword123",
      };

      const result = changePassword.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject short current password", () => {
      const invalidData = {
        currentPassword: "short",
        newPassword: "newpassword123",
      };

      const result = changePassword.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject short new password", () => {
      const invalidData = {
        currentPassword: "password123",
        newPassword: "short",
      };

      const result = changePassword.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject missing fields", () => {
      const invalidData = {
        currentPassword: "password123",
      };

      const result = changePassword.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });
});
