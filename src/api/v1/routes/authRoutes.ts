import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags: [Auth]
 */
router.post('/login', (req, res) => {
    res.json({ message: 'User logged in successfully' });
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     description: Registers a new user.
 *     tags: [Auth]
 */
router.post('/register', (req, res) => {
    res.json({ message: 'User registered successfully' });
});

export default router;
