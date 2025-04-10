import * as express from 'express';
import { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API endpoints for managing courses
 */

/**
 * @swagger
 * /api/v1/courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieves a list of all available courses.
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/', (req: Request, res: Response) => {
    res.json({
        courses: [
            { id: '1', title: 'Intro to JavaScript', description: 'Learn JavaScript basics.' },
            { id: '2', title: 'Advanced TypeScript', description: 'Master TypeScript features.' }
        ]
    });
});

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get a specific course by ID
 *     description: Retrieves details of a specific course using its ID.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Successfully retrieved course details.
 *       404:
 *         description: Course not found.
 */
router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
    const courseId = req.params.id;
    const courses = [
        { id: '1', title: 'Intro to JavaScript', description: 'Learn JavaScript basics.' },
        { id: '2', title: 'Advanced TypeScript', description: 'Master TypeScript features.' }
    ];
    
    const course = courses.find((c) => c.id === courseId);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ error: 'Course not found' });
    }
});

/**
 * @swagger
 * /api/v1/courses:
 *   post:
 *     summary: Create a new course
 *     description: Adds a new course to the system.
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course successfully created.
 */
router.post('/', (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const newCourse = { id: new Date().toISOString(), title, description };
    res.status(201).json(newCourse);
});

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   put:
 *     summary: Update a course
 *     description: Updates the details of an existing course.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully.
 *       404:
 *         description: Course not found.
 */
router.put('/:id', (req: Request, res: Response) => {
    const { title, description } = req.body;
    const courseId = req.params.id;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    res.json({ message: `Course ${courseId} updated successfully`, title, description });
});

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Removes a course from the system.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully.
 *       404:
 *         description: Course not found.
 */
router.delete('/:id', (req: Request, res: Response) => {
    const courseId = req.params.id;
    res.json({ message: `Course ${courseId} deleted successfully` });
});

export default router;
