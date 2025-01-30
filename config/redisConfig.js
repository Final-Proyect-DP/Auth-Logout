require('dotenv').config();
const redis = require('redis');
const logger = require('./logger');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redisClient.on('connect', () => {
  logger.info('Conexión exitosa a Redis');
});

redisClient.on('error', (err) => {
  logger.error('Error en la conexión Redis:', err);
});

module.exports = redisClient;
