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

                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        name: {
                            type: "string"
                        },
                        avatar: {
                            type: "string",
                            nullable: true
                        },
                        googleId: {
                            type: "string",
                            nullable: true
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
                            type: "string"
                        },
                        refreshToken: {
                            type: "string"
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