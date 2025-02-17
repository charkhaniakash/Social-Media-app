const Redis = require('ioredis');
const redis = new Redis();

// Handle Redis connection events
redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = redis;