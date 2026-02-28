import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource']
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  type: {
    type: String,
    enum: ['Full Time', 'Part Time', 'Contract', 'Remote'],
    default: 'Full Time'
  },
  tags: [{
    type: String,
    enum: ['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'],
    trim: true
  }],
  companyLogo: {
    type: String,
    default: ''
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

jobSchema.index({ title: 'text', company: 'text', description: 'text' });

export default mongoose.model('Job', jobSchema);
