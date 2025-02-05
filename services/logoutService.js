require('dotenv').config();
const { deleteFromRedis } = require('../utils/redisUtils');
const logger = require('../config/logger');

async function logoutUser(userId) {
    try {
        const result = await deleteFromRedis(userId);
        const message = result ? 'Session successfully closed' : 'Session not found';
        logger.info(`${message} for user ${userId}`);
        return message;
    } catch (error) {
        logger.error(`Logout error: ${error.message}`);
        throw new Error('Error closing session');
    }
}

module.exports = { logoutUser };
