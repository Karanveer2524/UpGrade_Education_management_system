import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase-admin/app';
import { setupSwagger } from '../config/swagger';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import enrollmentRoutes from './routes/enrollmentRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
initializeApp();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Setup Swagger Documentation
setupSwagger(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to UpGrade Pro - Secure Educational Management API');
});

export default app;
