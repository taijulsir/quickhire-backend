import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Job from './src/models/Job.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const updateJobsWithTags = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const jobs = await Job.find({ tags: { $size: 0 } });
    console.log(`Found ${jobs.length} jobs without tags`);

    for (const job of jobs) {
      let tags = ['Design', 'Full Time'];
      if (job.title.toLowerCase().includes('marketing')) tags = ['Marketing', 'Design'];
      if (job.title.toLowerCase().includes('brand')) tags = ['Design', 'Business'];
      if (job.title.toLowerCase().includes('strategist')) tags = ['Marketing'];
      if (job.title.toLowerCase().includes('data')) tags = ['Technology'];
      if (job.title.toLowerCase().includes('lead')) tags = ['Design', 'Business'];
      if (job.title.toLowerCase().includes('product')) tags = ['Marketing', 'Design'];

      job.tags = tags;
      await job.save();
    }

    console.log('Successfully updated jobs with tags');
    process.exit(0);
  } catch (error) {
    console.error('Error updating jobs:', error);
    process.exit(1);
  }
};

updateJobsWithTags();
