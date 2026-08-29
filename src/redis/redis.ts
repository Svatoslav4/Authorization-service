import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

export const redis = createClient({
    url: redisUrl,
})

redis.on('error', (error) => {
    console.log('Redis Error:', error)
})

export const connectRedis = async () => {
    try {
        if (!redis.isOpen) {
            await redis.connect()
        }
        console.log('Redis connected')
    } catch (error) {
        console.error('Failed to connect to Redis:', error)
        throw error
    }
}