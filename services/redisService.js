const redis = require('../config/redisConfig');
const logger = require('../config/logger');

const storeUserSession = async (userId, token) => {
  try {
    await redis.set(userId, token);
    logger.info(`Session stored in Redis for user: ${userId}`);
  } catch (error) {
    logger.error(`Error storing session in Redis: ${error.message}`);
    throw error;
  }
};

module.exports = {
  storeUserSession
};
