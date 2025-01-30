require('dotenv').config();
const { deleteFromRedis } = require('../utils/redisUtils');
const logger = require('../config/logger');

async function logoutUser(userId) {
    try {
        const result = await deleteFromRedis(userId);
        const message = result ? 'Sesión cerrada exitosamente' : 'Sesión no encontrada';
        logger.info(`${message} para usuario ${userId}`);
        return message;
    } catch (error) {
        logger.error(`Error en logout: ${error.message}`);
        throw new Error('Error al cerrar sesión');
    }
}

module.exports = { logoutUser };
