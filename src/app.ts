import express from "express"
import cors from "cors"
import userRoutes from "./models/user/user.routes"
import authRoutes from "./models/auth/auth.routes"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes);
app.use("/users", userRoutes);


export default app