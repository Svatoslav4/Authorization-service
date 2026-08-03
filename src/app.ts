import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import authRoutes from "./models/auth/auth.routes";
import userRoutes from "./models/user/user.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/logout",authRoutes)

export default app;