const kafka = require('../config/kafkaConfig');
const logger = require('../config/logger');
const userService = require('../services/userService');
const redisUtils = require('../utils/redisUtils');
require('dotenv').config();

const consumer = kafka.consumer({ groupId: 'Auth-Edit-Login-Consumer' });

const run = async () => {
  try {
    await consumer.connect();
    logger.info('Kafka consumer connected successfully');
    await consumer.subscribe({ topic: process.env.KAFKA_TOPIC_LOGIN, fromBeginning: true });
    logger.info(`Subscribed to topic: ${process.env.KAFKA_TOPIC_LOGIN}`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const encryptedMessage = JSON.parse(message.value.toString());
          const decryptedMessage = userService.decryptMessage(encryptedMessage);
          logger.info('Message decrypted successfully');

          const { userId, token } = decryptedMessage;
          if (!userId || !token) {
            throw new Error('Message missing userId or token');
          }

          await redisUtils.setToken(userId, token);
          logger.info(`Token stored in Redis for user ${userId}`);

        } catch (error) {
          logger.error('Error processing message:', {
            error: error.message,
            stack: error.stack
          });
        }
      },
    });
  } catch (error) {
    logger.error('Consumer initialization error:', error);
    throw error;
  }
};

module.exports = { run };