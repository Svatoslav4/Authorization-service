import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Auth Service API",
            version: "1.0.0",
            description:
                "REST API built with Express.js, TypeScript, Prisma, PostgreSQL, JWT Authentication and Google OAuth."
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

            schemas: {

                RegisterDto: {
                    type: "object",
                    required: ["email", "password", "name"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "Password123"
                        },
                        name: {
                            type: "string",
                            example: "John Doe"
                        }
                    }
                },

                LoginDto: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "Password123"
                        }
                    }
                },

                GoogleDto: {
                    type: "object",
                    required: ["token"],
                    properties: {
                        token: {
                            type: "string",
                            example: "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
                        }
                    }
                },

                ForgotPasswordDto: {
                    type: "object",
                    required: ["email"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@gmail.com"
                        }
                    }
                },

                ResetPasswordDto: {
                    type: "object",
                    required: ["token", "password"],
                    properties: {
                        token: {
                            type: "string",
                            example: "reset_token"
                        },
                        password: {
                            type: "string",
                            example: "NewPassword123"
                        }
                    }
                },

                ChangePasswordDto: {
                    type: "object",
                    required: ["currentPassword", "newPassword"],
                    properties: {
                        currentPassword: {
                            type: "string",
                            example: "OldPassword123"
                        },
                        newPassword: {
                            type: "string",
                            example: "NewPassword123"
                        }
                    }
                },

                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            example: "cmabc123456"
                        },
                        email: {
                            type: "string",
                            example: "john@gmail.com"
                        },
                        name: {
                            type: "string",
                            example: "John Doe"
                        },
                        avatar: {
                            type: "string",
                            nullable: true,
                            example: "https://example.com/avatar.png"
                        },
                        googleId: {
                            type: "string",
                            nullable: true,
                            example: "109876543210987654321"
                        },
                        role: {
                            type: "string",
                            example: "User"
                        }
                    }
                },

                AuthResponse: {
                    type: "object",
                    properties: {
                        user: {
                            $ref: "#/components/schemas/User"
                        },
                        accessToken: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        },
                        refreshToken: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        }
                    }
                },

                MessageResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Success"
                        }
                    }
                },

                ChangePasswordResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Password changed successfully. Please login again."
                        }
                    }
                },

                ErrorResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Invalid credentials"
                        }
                    }
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: [
        "./src/models/**/*.ts"
    ]
});