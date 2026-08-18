import dotenv from "dotenv";
import app from "./app";
import colors from "colors";
import { connectRedis } from "./redis/redis";

dotenv.config();

const port = Number(process.env.PORT) || 5000;

const startServer = async () => {
    try {
        await connectRedis();

        app.listen(port, "0.0.0.0", () => {
            console.log(
                colors.green(`Server running on http://localhost:${port}`)
            );
        });
    } catch (error) {
        console.error("Failed running server", error);
        process.exit(1);
    }
};

startServer();