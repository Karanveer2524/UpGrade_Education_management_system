import Course, { ICourse } from '../models/courseModel';
import User, { IUser } from '../models/userModel';

export class CourseService {
  static async createCourse(data: ICourse) {
    const course = new Course(data);
    return await course.save();
  }

  static async getCoursesByInstitution(institution: string) {
    return await Course.find({ institution });
  }

  static async getCourseById(id: string) {
    return await Course.findById(id);
  }

  static async updateCourse(id: string, data: Partial<ICourse>) {
    return await Course.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteCourse(id: string) {
    return await Course.findByIdAndDelete(id);
  }

  static async publishCourse(id: string) {
    return await Course.findByIdAndUpdate(id, { status: 'published' }, { new: true });
  }

  static async unpublishCourse(id: string) {
    return await Course.findByIdAndUpdate(id, { status: 'draft' }, { new: true });
  }

  static async getCourseAnalytics(id: string) {
    const course = await Course.findById(id);
    if (!course) throw new Error('Course not found');
    const usersEnrolled = await User.find({ institution: course.institution });
    return { course, usersEnrolled };
  }
}
