import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './src/models/Job.js';

dotenv.config();

const allowedTags = ['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'];

const cleanupTags = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const jobs = await Job.find({});
    console.log(`Checking ${jobs.length} jobs for invalid tags...`);

    for (const job of jobs) {
      if (!job.tags || job.tags.length === 0) {
        // If no tags, assign category as the default tag
        job.tags = [job.category];
        await job.save();
        continue;
      }

      // Filter out tags not in the allowed list
      const validTags = job.tags.filter(tag => allowedTags.includes(tag));
      
      // If result is empty or changed, update
      if (validTags.length !== job.tags.length || validTags.length === 0) {
        job.tags = validTags.length > 0 ? validTags : [job.category];
        await job.save();
        console.log(`Updated job: ${job.title} with tags: ${job.tags}`);
      }
    }

    console.log('Successfully cleaned up job tags');
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning up tags:', error);
    process.exit(1);
  }
};

cleanupTags();
