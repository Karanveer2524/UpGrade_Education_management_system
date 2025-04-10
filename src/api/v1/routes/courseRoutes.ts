import express from 'express';
import { CourseController } from '../controllers/courseController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.post('/courses', authenticate, CourseController.createCourse);
router.get('/courses/:institutionId', authenticate, CourseController.listCourses);
router.get('/courses/:id', authenticate, CourseController.getCourseDetails);
router.put('/courses/:id', authenticate, CourseController.updateCourse);
router.delete('/courses/:id', authenticate, CourseController.archiveCourse);

if (CourseController.publishCourse) {
    router.post('/courses/:id/publish', authenticate, CourseController.publishCourse);
}
if (CourseController.getCourseStats) {
    router.get('/courses/:id/stats', authenticate, CourseController.getCourseStats);
}

export default router;
