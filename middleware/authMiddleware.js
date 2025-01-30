const jwt = require('jsonwebtoken');
const { getToken } = require('../utils/redisUtils');
const handleErrors = require('../utils/handleErrors');
const logger = require('../config/logger');

const verifyToken = async (req, res, next) => {
  const { token } = req.query;
  const { id } = req.params;

  // Agregar logs para mostrar clave y valor
  logger.info('Petición recibida:');
  logger.info(`Clave (ID): ${id}`);
  logger.info(`Valor (Token): ${token}`);

  if (!token || !id) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token o ID faltante' 
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const storedToken = await getToken(id);

    logger.info(`Token almacenado en Redis: ${storedToken}`);
    
    if (!storedToken || storedToken !== token) {
      throw new Error('Sesión inválida o expirada');
    }

    req.userId = id;
    next();
  } catch (err) {
    const error = handleErrors(err);
    return res.status(error.status).json(error.response);
  }
};

module.exports = { verifyToken };
