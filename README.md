# 🔐 Auth Service

Modern authentication service built with **Express.js**, **TypeScript**, **Prisma**, **PostgreSQL**, **JWT**, **Google OAuth** and **Email Verification**.

---

## 🚀 Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Access Token
- ✅ Refresh Token
- ✅ Google OAuth Authentication
- ✅ Email Verification
- ✅ Password Hashing (bcrypt)
- ✅ Request Validation (Zod)
- ✅ Prisma ORM
- ✅ PostgreSQL
- ✅ Swagger API Documentation
- ✅ Layered Architecture

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- Google OAuth 2.0
- Email Verification
- bcrypt

### Validation

- Zod

### Documentation

- Swagger UI

### Testing

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
│   └── user
│
├── prisma
│   └── client.ts
│
├── types
│
├── utils
│   ├── bcrypt.ts
│   ├── google.ts
│   ├── jwt.ts
│   └── mail.service.ts
│
├── app.ts
└── server.ts
```

---

# ⚙ Installation

Clone repository

```bash
git clone https://github.com/your-username/auth-service.git
```

Go to project

```bash
cd auth-service
```

Install dependencies

```bash
npm install
```

---

# 🔧 Environment Variables

Create `.env`

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

# 📖 API Documentation

Swagger

```
http://localhost:5000/docs
```

---

# 🔑 Authentication Flow

1. Register
2. Verify Email
3. Login
4. Receive Access Token
5. Access Protected Routes
6. Google Login

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register |
| POST | /auth/login | Login |
| POST | /auth/google | Google Login |
| GET | /auth/verify-email | Verify Email |

---

## Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /users/me | Current User |

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Google OAuth
- Email Verification
- Zod Validation
- Protected Routes

---

# 📸 Screenshots

Swagger

```
<img width="1472" height="741" alt="image" src="https://github.com/user-attachments/assets/3576860e-48bb-460d-a94f-fcaeab73aef4" />
<img width="1432" height="637" alt="image" src="https://github.com/user-attachments/assets/2634a66a-3a21-49a9-8e3a-3041ff169387" />
<img width="1429" height="675" alt="image" src="https://github.com/user-attachments/assets/8eb12b8a-e5cc-45ce-8661-2f46d8806995" />
---

# 👨‍💻 Author

**Svyat Sakati**

GitHub

```
[https://github.com/your-github](https://github.com/Svatoslav4)
```

LinkedIn

```
[https://linkedin.com/in/your-profile](https://www.linkedin.com/in/sviatoslav-kushey-34388734a/)
```
