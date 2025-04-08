import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get system analytics
 *     description: Fetches analytics data.
 *     tags: [Analytics]
 */
router.get('/', (req, res) => {
    res.json({ analytics: { users: 100, courses: 10 } });
});

export default router;
