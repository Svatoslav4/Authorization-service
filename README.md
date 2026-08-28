# 🔐 Auth Service

Modern authentication service built with **Express.js**, **TypeScript**, **Prisma**, **PostgreSQL**, **JWT**, and **Google OAuth**.

The project provides a secure authentication system with user registration, login, JWT access and refresh tokens, Google OAuth authentication, request validation, protected routes, Swagger documentation, and unit testing.

---

# 🚀 Features

* ✅ User Registration
* ✅ User Login
* ✅ JWT Authentication
* ✅ Access Token
* ✅ Refresh Token
* ✅ Google OAuth 2.0 Authentication
* ✅ Password Hashing with bcrypt
* ✅ Request Validation with Zod
* ✅ Protected Routes
* ✅ User Management
* ✅ Prisma ORM
* ✅ PostgreSQL Database
* ✅ Swagger API Documentation
* ✅ Modular Architecture
* ✅ Repository Pattern
* ✅ Unit Testing with Jest
* ✅ Environment Variables
* ✅ TypeScript

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript

## Database

* PostgreSQL
* Prisma ORM

## Authentication & Security

* JWT
* Google OAuth 2.0
* bcrypt

## Validation

* Zod

## Documentation

* Swagger / OpenAPI

## Testing

* Jest

## Development Tools

* Git
* GitHub
* npm
* Prisma Studio

---

# 🏗 Architecture

The project follows a **modular architecture**, where each business domain is isolated into its own module.

This structure makes the application easier to maintain, test, extend, and scale.

```text
src
│
├── config
│   └── swagger.ts
│
├── middlewares
│   └── auth.middleware.ts
│
├── models
│   │
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   └── auth.validation.ts
│   │
│   └── user
│       ├── user.controller.ts
│       ├── user.repository.ts
│       ├── user.routes.ts
│       └── user.service.ts
│
├── prisma
│   └── client.ts
│
├── types
│   ├── auth.types.ts
│   └── index.d.ts
│
├── utils
│   ├── bcrypt.ts
│   ├── google.ts
│   └── jwt.ts
│
├── app.ts
└── server.ts
```

## 📦 Modules

### 🔐 Auth Module

Responsible for authentication functionality:

* User registration
* User login
* JWT authentication
* Access tokens
* Refresh tokens
* Google OAuth authentication
* Request validation

### 👤 User Module

Responsible for user-related functionality:

* User management
* User data retrieval
* User repository
* Protected user endpoints

## 🎯 Architecture Principles

* 📦 Feature-based modular structure
* 🔐 Separation of business domains
* 🧩 Independent modules
* 🔄 Reusable components
* 🧪 Easier testing
* 🛠 Easier maintenance
* 📈 Scalable architecture

---

# 📁 Project Structure

```text
AuthService

├── .github
├── .vscode
├── dist
├── node_modules
├── prisma
├── src
│   │
│   ├── config
│   │   └── swagger.ts
│   │
│   ├── middlewares
│   │   └── auth.middleware.ts
│   │
│   ├── models
│   │   │
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   └── user
│   │       ├── user.controller.ts
│   │       ├── user.repository.ts
│   │       ├── user.routes.ts
│   │       └── user.service.ts
│   │
│   ├── prisma
│   │   └── client.ts
│   │
│   ├── types
│   │   ├── auth.types.ts
│   │   └── index.d.ts
│   │   └── user.types.ts
│   │
│   ├── utils
│   │   ├── bcrypt.ts
│   │   ├── google.ts
│   │   └── jwt.ts
│   │
│   ├── app.ts
│   └── server.ts
├── prisma
│   ├── client.ts
├── redis
│   ├── redis.ts
├── tests
│   │
│   ├── auth
│   │   ├── auth.controller.test.ts
│   │   ├── auth.middleware.test.ts
│   │   ├── auth.routes.test.ts
│   │   ├── auth.service.test.ts
│   │   └── auth.validation.test.ts
│   │
│   ├── user
│   │   ├── user.controller.test.ts
│   │   ├── user.repository.test.ts
│   │   ├── user.routes.test.ts
│   │   └── user.service.test.ts
│   │
│   └── utils
│       ├── bcrypt.test.ts
│       ├── google.test.ts
│       └── jwt.test.ts
│
├── prisma
│   └── schema.prisma
├──  jest.config.js
├── .prettierignore
├── .prettierrc
├── .dockerignore
├── docker-compose.yml
├── Dockerfile
├── LICENSE
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/Svatoslav44/AuthService.git
```

## 2. Go to the project directory

```bash
cd AuthService
```

## 3. Install dependencies

```bash
npm install
```

---

# 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/authservice"

PORT=5000

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> ⚠️ Never commit your `.env` file to GitHub.

---

# 🗄️ Database Setup

This project uses **PostgreSQL** with **Prisma ORM**.

## Generate Prisma Client

```bash
npx prisma generate
```

## Run database migrations

```bash
npx prisma migrate dev
```

## Open Prisma Studio

```bash
npx prisma studio
```

---

# ▶️ Running the Application

## Development

```bash
npm run dev
```

The server will start on:

```text
http://localhost:5000
```

## Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# 📖 API Documentation

Swagger / OpenAPI documentation is available after starting the server:

```text
http://localhost:5000/docs
```

Swagger provides interactive documentation for the available API endpoints.

---

# 🔑 Authentication Flow

## Standard Authentication

```text
Register
   │
   ▼
Login
   │
   ▼
Access Token + Refresh Token
   │
   ▼
Protected API Request
   │
   ▼
JWT Authentication
```

## Google OAuth

```text
Google OAuth
     │
     ▼
Google Token Verification
     │
     ▼
User Authentication
     │
     ▼
JWT Access + Refresh Tokens
```

---

# 📌 API Endpoints

## 🔐 Authentication

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/register` | Register a new user      |
| POST   | `/auth/login`    | Login user               |
| POST   | `/auth/google`   | Authenticate with Google |

---

## 👤 Users

| Method | Endpoint    | Description                    |
| ------ | ----------- | ------------------------------ |
| GET    | `/users/me` | Get current authenticated user |

---

# 🔒 Security

The project implements several security mechanisms:

* 🔐 JWT Authentication
* 🔑 Access and Refresh Tokens
* 🔒 Protected Routes
* 🔐 Password Hashing with bcrypt
* 🔎 Request Validation with Zod
* 🔑 Google OAuth 2.0
* 🌐 Environment Variables for Sensitive Configuration
* 🚫 Sensitive User Fields Excluded from API Responses

---

# 🧪 Testing

The project uses **Jest** for unit testing.

## Run all tests

```bash
npm test
```

## Run tests in watch mode

```bash
npm run test:watch
```

## Generate test coverage

```bash
npm run test:coverage
```

Tests cover:

* Authentication
* Controllers
* Services
* Routes
* Middleware
* Validation
* Repository
* JWT utilities
* bcrypt utilities
* Google authentication utilities

---

# 📊 Testing Structure

```text
Tests
│
├── Auth
│   ├── Controller
│   ├── Service
│   ├── Routes
│   ├── Middleware
│   └── Validation
│
├── User
│   ├── Controller
│   ├── Service
│   ├── Repository
│   └── Routes
│
└── Utils
    ├── JWT
    ├── bcrypt
    └── Google OAuth
```

---

# 🔄 Example Authentication Request

## Register

```http
POST /auth/register
Content-Type: application/json
```

Example request:

```json
{
  "email": "test@gmail.com",
  "password": "StrongPassword123",
  "name": "Test User"
}
```

---

## Login

```http
POST /auth/login
Content-Type: application/json
```

Example request:

```json
{
  "email": "test@gmail.com",
  "password": "StrongPassword123"
}
```

---

# 🧠 What This Project Demonstrates

This project demonstrates practical backend development skills including:

* REST API Development
* Authentication and Authorization
* JWT Token Management
* OAuth 2.0 Integration
* PostgreSQL Database
* Prisma ORM
* Modular Architecture
* Repository Pattern
* Middleware Development
* Input Validation
* Password Security
* Unit Testing
* API Documentation
* TypeScript Development

---

# 🚀 Future Improvements

Planned improvements:

Password Reset
 Email Verification
 Redis Cache
 Rate Limiting
 Docker
 Docker Compose
 CI/CD with GitHub Actions
 Integration Testing
 Refresh Token Rotation
 Account Lockout Protection
 Production Deployment

---

# 👨‍💻 Author

## Svyat Sakati

Junior Backend Developer focused on **Node.js, TypeScript, Express.js and NestJS**.

* **GitHub:** https://github.com/Svatoslav44
* **LinkedIn:** https://www.linkedin.com/in/sviatoslav-kushey-34388734a/

---

# ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**.
