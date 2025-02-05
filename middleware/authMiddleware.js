const jwt = require('jsonwebtoken');
const { getToken } = require('../utils/redisUtils');
const handleErrors = require('../utils/handleErrors');
const logger = require('../config/logger');

const verifyToken = async (req, res, next) => {
  const { token } = req.query;
  const { id } = req.params;

  logger.info('Request received:');
  logger.info(`Key (ID): ${id}`);
  logger.info(`Value (Token): ${token}`);

  if (!token || !id) {
    return res.status(401).json({ 
      success: false, 
      message: 'Missing token or ID' 
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const storedToken = await getToken(id);

    logger.info(`Token stored in Redis: ${storedToken}`);
    
    if (!storedToken || storedToken !== token) {
      throw new Error('Invalid or expired session');
    }

    req.userId = id;
    
    next();
  } catch (err) {
    const error = handleErrors(err);
    return res.status(error.status).json(error.response);
  }
};

module.exports = { verifyToken };
