import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users.
 *     tags: [Users]
 */
router.get('/', (req, res) => {
    res.json({ users: [] });
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Returns user details by ID.
 *     tags: [Users]
 */
router.get('/:id', (req, res) => {
    res.json({ user: { id: req.params.id } });
});

export default router;
