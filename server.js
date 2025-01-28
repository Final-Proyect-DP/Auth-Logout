require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const logoutRoutes = require('./routes/logoutRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Logout API',
            version: '1.0.0',
            description: 'API para desloguear usuarios'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/logout', logoutRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
