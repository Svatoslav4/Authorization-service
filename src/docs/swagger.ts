import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Auth Service API",
            version: "1.0.0",
            description:
                "REST API for authentication and user management built with Express.js, TypeScript, Prisma, PostgreSQL, Redis, JWT and Google OAuth.",
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server",
            },
        ],

        tags: [
            {
                name: "Authentication",
                description: "Authentication endpoints",
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
                },
            },

            schemas: {
                RegisterDto: {
                    type: "object",
                    required: [
                        "email",
                        "password",
                        "name",
                    ],

                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "test@gmail.com",
                        },

                        password: {
                            type: "string",
                            format: "password",
                            minLength: 8,
                            example: "Password123",
                        },

                        name: {
                            type: "string",
                            example: "Test User",
                        },
                    },
                },

                LoginDto: {
                    type: "object",
                    required: [
                        "email",
                        "password",
                    ],

                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "test@gmail.com",
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
                            example:
                                "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
                            description:
                                "Google OAuth ID token",
                        },
                    },
                },

                ChangePasswordDto: {
                    type: "object",
                    required: [
                        "currentPassword",
                        "newPassword",
                    ],

                    properties: {
                        currentPassword: {
                            type: "string",
                            format: "password",
                            minLength: 8,
                            example: "OldPassword123",
                        },

                        newPassword: {
                            type: "string",
                            format: "password",
                            minLength: 8,
                            example: "NewPassword123",
                        },
                    },
                },

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
                            example: "test@gmail.com",
                        },

                        name: {
                            type: "string",
                            example: "Test User",
                        },

                        avatar: {
                            type: "string",
                            nullable: true,
                            example:
                                "https://example.com/avatar.png",
                        },

                        googleId: {
                            type: "string",
                            nullable: true,
                            example:
                                "109876543210987654321",
                        },

                        role: {
                            type: "string",
                            enum: [
                                "User",
                                "Admin",
                            ],
                            example: "User",
                        },

                        emailVerified: {
                            type: "boolean",
                            example: true,
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example:
                                "2026-08-15T10:00:00.000Z",
                        },
                    },
                },

                AuthResponse: {
                    type: "object",

                    properties: {
                        user: {
                            $ref:
                                "#/components/schemas/User",
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

                UserResponse: {
                    type: "object",

                    properties: {
                        user: {
                            $ref:
                                "#/components/schemas/User",
                        },
                    },
                },

                UsersResponse: {
                    type: "object",

                    properties: {
                        users: {
                            type: "array",

                            items: {
                                $ref:
                                    "#/components/schemas/User",
                            },
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

                ErrorResponse: {
                    type: "object",

                    properties: {
                        message: {
                            type: "string",
                            example:
                                "Invalid credentials",
                        },
                    },
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [
        path.join(
            process.cwd(),
            process.env.NODE_ENV === "production"
                ? "dist/models/**/*.js"
                : "src/models/**/*.ts"
        ),
    ],
});
