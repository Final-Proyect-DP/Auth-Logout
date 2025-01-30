require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const logoutRoutes = require('./routes/logoutRoutes');
const logger = require('./config/logger');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
app.use('/logout', logoutRoutes);

app.listen(PORT, () => logger.info(`Servidor iniciado en puerto ${PORT}`));
