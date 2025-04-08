import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Swagger definition
const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'UpGrade Pro API',
            version: '1.0.0',
            description: 'API documentation for the UpGrade Pro educational platform',
            contact: {
                name: 'Karanveer Singh',
                email: 'karanveer@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local development server',
            },
            {
                url: 'https://upgrade-pro-api.example.com',
                description: 'Production server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to your route files
};

// Initialize Swagger Docs
const swaggerSpec = swaggerJsdoc(options);

// Function to setup Swagger in Express
export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerSpec;
