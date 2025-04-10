import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  description: string;
  instructor: string;
  institution: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

const courseSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['draft', 'published'] }
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
