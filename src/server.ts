import dotenv from 'dotenv'
import app from './app'
import colors from 'colors'
import { connectRedis } from '././redis/redis';

dotenv.config()

const port = process.env.port || 5000

const startServer = async() => {
    try {
        await connectRedis()
        app.listen(port, () => {
            console.log(colors.green(`Server running on http://localhost:${port}`));
        }) 
    }
    catch(error) {
        console.error('Failed running server',error)
        process.exit(1)
    }
}

startServer()
