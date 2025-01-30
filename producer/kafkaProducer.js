const kafka = require('../config/kafkaConfig');
const logger = require('../config/logger');
const { encrypt } = require('../services/userService');
const handleErrors = require('../utils/handleErrors');

const producer = kafka.producer();

const sendLogoutMessage = async (userId, token) => {
  try {
    const messageData = { userId, token};
    const encryptedMessage = encrypt(messageData);

    await producer.send({
      topic: process.env.KAFKA_TOPIC_LOGOUT,
      messages: [
        {
          key: userId,
          value: JSON.stringify(encryptedMessage)
        },
      ],
    });
    logger.info(`Mensaje de logout encriptado enviado para usuario ${userId}`);
  } catch (error) {
    const handledError = handleErrors(error, userId);
    logger.error(`Error al enviar mensaje de login: ${handledError.response.message}`);
    throw handledError;
  }
};

// Inicializar el productor
producer.connect().catch(err => {
  const handledError = handleErrors(err);
  logger.error(`Error conectando el productor Kafka: ${handledError.response.message}`);
});

module.exports = { sendLogoutMessage };
