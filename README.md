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
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/Svatoslav4/AuthService.git
```

Go to the project

```bash
cd AuthService
```

Install dependencies

```bash
npm install
```

---

# 🔧 Environment Variables

Create a `.env` file

```env
DATABASE_URL="postgresql://username:password@localhost:5432/authservice"

PORT=5000

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

# ▶ Running

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

---

# 🗄 Database

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# 🧪 Testing

Run all tests

```bash
npm test
```

Run tests in watch mode

```bash
npm run test:watch
```

Generate test coverage

```bash
npm run test:coverage
```

---

# 📖 API Documentation

After starting the server, Swagger is available at:

```text
http://localhost:5000/docs
```

---

# 🔑 Authentication Flow

1. Register
2. Login
3. Receive JWT Access Token
4. Access Protected Routes
5. Authenticate with Google OAuth

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login |
| POST | `/auth/google` | Google Authentication |

---

## Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users/me` | Get Current User |

---

# 🔒 Security

- JWT Authentication
- Password Hashing with bcrypt
- Google OAuth 2.0
- Zod Validation
- Protected Routes

---

# 📸 Swagger Screenshots

## Authentication Endpoints

<img width="1472" alt="Authentication Endpoints" src="https://github.com/user-attachments/assets/3576860e-48bb-460d-a94f-fcaeab73aef4"/>

---

## Google Authentication

<img width="1432" alt="Google Authentication" src="https://github.com/user-attachments/assets/2634a66a-3a21-49a9-8e3a-3041ff169387"/>

---

## User Endpoints

<img width="1429" alt="User Endpoints" src="https://github.com/user-attachments/assets/8eb12b8a-e5cc-45ce-8661-2f46d8806995"/>

---

# 👨‍💻 Author

**Svyat Sakati**

- **GitHub:** https://github.com/Svatoslav4
- **LinkedIn:** https://www.linkedin.com/in/sviatoslav-kushey-34388734a/

---

# ⭐ Future Improvements
- Password Reset
- Redis Cache
- Docker
- CI/CD (GitHub Actions)

---

## 📄 License

This project is licensed under the **MIT License**.
