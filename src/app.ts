import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger";

import authRoutes from "./models/auth/auth.routes";
import userRoutes from "./models/user/user.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;