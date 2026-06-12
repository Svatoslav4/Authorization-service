import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}) 