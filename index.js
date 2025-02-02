require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const logoutRoutes = require('./routes/logoutRoutes');
const logger = require('./config/logger');
const authLoginConsumer = require('./consumers/authLoginConsumer');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
const corsOptions = {
  origin: '*', // En producción, especifica los orígenes permitidos
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Logout API',
            version: '1.0.0',
            description: 'API para gestión de cierre de sesión'
        },
        servers: [{ url: `http://localhost:${PORT}` }]
    },
    apis: ['./routes/*.js']
};

authLoginConsumer.run().catch(err => {
    logger.error('Error al iniciar authLoginConsumer:', err);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
app.use('/logout', logoutRoutes);

app.listen(PORT, () => logger.info(`Servidor iniciado en puerto ${PORT}`));
