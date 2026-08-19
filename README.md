# 🔐 Auth Service

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Google OAuth](https://img.shields.io/badge/Google-OAuth2-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

Modern authentication service built with **Express.js**, **TypeScript**, **Prisma**, **PostgreSQL**, **JWT**, and **Google OAuth**.

---

# 🚀 Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Access Token
- ✅ Refresh Token
- ✅ Google OAuth Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Request Validation (Zod)
- ✅ Prisma ORM
- ✅ PostgreSQL
- ✅ Swagger API Documentation
- ✅ Layered Architecture
- ✅ Unit Testing (Jest)

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- Google OAuth 2.0
- bcrypt

## Validation

- Zod

## Documentation

- Swagger UI

## Testing

- Jest

---

# 📁 Project Structure

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
│
tests
│
├── auth
│   ├── auth.controller.test.ts
│   ├── auth.middleware.test.ts
│   ├── auth.routes.test.ts
│   ├── auth.service.test.ts
│   └── auth.validation.test.ts
│
├── user
│   ├── user.controller.test.ts
│   ├── user.repository.test.ts
│   ├── user.routes.test.ts
│   └── user.service.test.ts
│
└── utils
    ├── bcrypt.test.ts
    ├── google.test.ts
    └── jwt.test.ts
