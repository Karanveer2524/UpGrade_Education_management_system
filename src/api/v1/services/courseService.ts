import { Course } from '../models/course';
import { User } from '../models/user';

export class CourseService {
  static async createCourse(courseData: any, user: User) {
    if (!user.roles.includes('Teacher')) {
      throw new Error('Only teachers can create courses');
    }
    const newCourse = new Course({
      ...courseData,
      institution: user.institution,
      owner: user.id,
      status: 'draft',
    });
    return await newCourse.save();
  }

  static async listCourses(institutionId: string) {
    return await Course.find({ institution: institutionId });
  }

  static async getCourseDetails(courseId: string, user: User) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    if (!course.enrolledUsers.includes(user.id) && course.owner !== user.id) {
      throw new Error('You do not have permission to view this course');
    }
    return course;
  }

  static async updateCourse(courseId: string, courseData: any, user: User) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    if (course.owner !== user.id && !user.roles.includes('Admin')) {
      throw new Error('You are not authorized to update this course');
    }
    Object.assign(course, courseData);
    return await course.save();
  }

  static async archiveCourse(courseId: string, user: User) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    if (course.owner !== user.id && !user.roles.includes('Admin')) {
      throw new Error('You are not authorized to archive this course');
    }
    course.status = 'archived';
    return await course.save();
  }

  static async publishCourse(courseId: string, user: User, publish: boolean) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    if (course.owner !== user.id && !user.roles.includes('Teacher')) {
      throw new Error('You are not authorized to publish/unpublish this course');
    }
    course.status = publish ? 'published' : 'draft';
    return await course.save();
  }

  static async getCourseStats(courseId: string, user: User) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    if (course.owner !== user.id && !user.roles.includes('Teacher')) {
      throw new Error('You are not authorized to view course stats');
    }
    return { enrollments: course.enrolledUsers.length };
  }
}
