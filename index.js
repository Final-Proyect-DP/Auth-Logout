require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const logoutRoutes = require('./routes/logoutRoutes');
const logger = require('./config/logger');
const authLoginConsumer = require('./consumers/authLoginConsumer');
const swaggerOptions = require('./config/swaggerConfig');

const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'auth-logout' });
  });
  

authLoginConsumer.run().catch(err => {
    logger.error('Error al iniciar authLoginConsumer:', err);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
app.use('/logout', logoutRoutes);

app.listen(PORT, () => logger.info(`Server running on: ${PORT}`));
