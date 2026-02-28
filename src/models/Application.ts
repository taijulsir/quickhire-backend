import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IApplication extends Document {
  job_id: Types.ObjectId;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  created_at: Date;
  updated_at: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    job_id: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    resume_link: {
      type: String,
      required: [true, 'Resume link is required'],
    },
    cover_note: {
      type: String,
      required: [true, 'Cover note is required'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export default mongoose.model<IApplication>('Application', applicationSchema);
