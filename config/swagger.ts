import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import courseRoutes from '../src/api/v1/routes/courseRoutes';

const app = express();

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Course Management API',
      version: '1.0.0',
      description: 'API for managing courses in an education system',
    },
    basePath: '/',
  },
  apis: ['./src/routes/courseRoutes.ts'], // Path to the routes file
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use Course routes
app.use('/api/v1', courseRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
