import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Enroll in a course
 *     description: Enrolls a user in a specified course.
 *     tags: [Enrollments]
 */
router.post('/', (req, res) => {
    res.json({ message: 'User enrolled successfully' });
});

export default router;
