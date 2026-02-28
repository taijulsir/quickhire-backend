import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: string;
  tags: string[];
  companyLogo: string;
  created_at: Date;
  updated_at: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Design',
        'Sales',
        'Marketing',
        'Finance',
        'Technology',
        'Engineering',
        'Business',
        'Human Resource',
      ],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    type: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Contract', 'Remote'],
      default: 'Full Time',
    },
    tags: [
      {
        type: String,
        enum: [
          'Design',
          'Sales',
          'Marketing',
          'Finance',
          'Technology',
          'Engineering',
          'Business',
          'Human Resource',
        ],
        trim: true,
      },
    ],
    companyLogo: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

jobSchema.index({ title: 'text', company: 'text', description: 'text' });

export default mongoose.model<IJob>('Job', jobSchema);
