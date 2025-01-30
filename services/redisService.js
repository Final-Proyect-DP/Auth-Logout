const redis = require('../config/redisConfig');
const logger = require('../config/logger');

const storeUserSession = async (userId, token) => {
  try {
    await redis.set(userId, token);
    logger.info(`Sesión almacenada en Redis para usuario: ${userId}`);
  } catch (error) {
    logger.error(`Error almacenando sesión en Redis: ${error.message}`);
    throw error;
  }
};

module.exports = {
  storeUserSession
};
