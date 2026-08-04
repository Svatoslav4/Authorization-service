import dotenv from 'dotenv'
import app from './app'
import colors from 'colors'

dotenv.config()

const port = process.env.port || 5000

app.listen(port, () => {
    console.log(colors.green(`Server running on http://localhost:${port}`));
}) 