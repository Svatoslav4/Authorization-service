import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Auth Service API",
            version: "1.0.0",
            description:
                "REST API built with Express.js, TypeScript, Prisma, PostgreSQL, Redis, JWT Authentication and Google OAuth.",
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server",
            },
        ],

        tags: [
            {
                name: "Authentication",
                description: "Authentication and authorization endpoints",
            },
            {
                name: "Users",
                description: "User management endpoints",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter JWT access token",
                },
            },

            schemas: {
                // =========================
                // AUTH DTOs
                // =========================

                RegisterDto: {
                    type: "object",
                    required: ["email", "password", "name"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@gmail.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            minLength: 6,
                            example: "Password123",
                        },
                        name: {
                            type: "string",
                            example: "John Doe",
                        },
                    },
                },

                LoginDto: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@gmail.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "Password123",
                        },
                    },
                },

                GoogleDto: {
                    type: "object",
                    required: ["token"],
                    properties: {
                        token: {
                            type: "string",
                            description: "Google ID Token",
                            example: "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
                        },
                    },
                },

                ChangePasswordDto: {
                    type: "object",
                    required: ["currentPassword", "newPassword"],
                    properties: {
                        currentPassword: {
                            type: "string",
                            format: "password",
                            example: "OldPassword123",
                        },
                        newPassword: {
                            type: "string",
                            format: "password",
                            minLength: 6,
                            example: "NewPassword123",
                        },
                    },
                },

                ForgotPasswordDto: {
                    type: "object",
                    required: ["email"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@gmail.com",
                        },
                    },
                },

                ResetPasswordDto: {
                    type: "object",
                    required: ["token", "password"],
                    properties: {
                        token: {
                            type: "string",
                            example: "reset_token",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "NewPassword123",
                        },
                    },
                },

                // =========================
                // USER
                // =========================

                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            example: "cmabc123456",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@gmail.com",
                        },
                        name: {
                            type: "string",
                            example: "John Doe",
                        },
                        avatar: {
                            type: "string",
                            nullable: true,
                            example: "https://example.com/avatar.png",
                        },
                        googleId: {
                            type: "string",
                            nullable: true,
                            example: "109876543210987654321",
                        },
                        role: {
                            type: "string",
                            enum: ["User", "Admin"],
                            example: "User",
                        },
                        emailVerified: {
                            type: "boolean",
                            example: true,
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-08-15T10:00:00.000Z",
                        },
                    },
                },

                // =========================
                // RESPONSES
                // =========================

                AuthResponse: {
                    type: "object",
                    properties: {
                        user: {
                            $ref: "#/components/schemas/User",
                        },
                        accessToken: {
                            type: "string",
                            example:
                                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                        refreshToken: {
                            type: "string",
                            example:
                                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                    },
                },

                MessageResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Success",
                        },
                    },
                },

                ChangePasswordResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example:
                                "Password changed successfully. Please login again.",
                        },
                    },
                },

                ErrorResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Invalid credentials",
                        },
                    },
                },

                // =========================
                // USER RESPONSES
                // =========================

                UserResponse: {
                    type: "object",
                    properties: {
                        user: {
                            $ref: "#/components/schemas/User",
                        },
                    },
                },

                UsersResponse: {
                    type: "object",
                    properties: {
                        users: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },
            },
        },

        // JWT required by default
        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    // IMPORTANT FOR DOCKER
    apis: [
        path.join(process.cwd(), "src/models/**/*.ts"),
    ],
});