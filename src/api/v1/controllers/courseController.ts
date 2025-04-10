import { Request, Response } from 'express';
import { CourseService } from '../services/courseService';
import { IUser } from '../models/userModel';

// Extend the Express Request to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export class CourseController {
  static async createCourse(req: Request, res: Response) {
    try {
      const user = req.user as IUser;
      const courseData = req.body;
      const newCourse = await CourseService.createCourse(courseData, user);
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async listCourses(req: Request, res: Response) {
    try {
      const institutionId = req.params.institutionId;
      const courses = await CourseService.listCourses(institutionId);
      res.status(200).json(courses);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async getCourseDetails(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const user = req.user as IUser;
      const course = await CourseService.getCourseDetails(courseId, user);
      res.status(200).json(course);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const user = req.user as IUser;
      const courseData = req.body;
      const updatedCourse = await CourseService.updateCourse(courseId, courseData, user);
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async archiveCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const user = req.user as IUser;
      const archivedCourse = await CourseService.archiveCourse(courseId, user);
      res.status(200).json(archivedCourse);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // Missing method: Publish Course
  static async publishCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const user = req.user as IUser;
      const publishedCourse = await CourseService.publishCourse(courseId, user);
      res.status(200).json(publishedCourse);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // Missing method: Get Course Stats
  static async getCourseStats(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const stats = await CourseService.getCourseStats(courseId);
      res.status(200).json(stats);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
