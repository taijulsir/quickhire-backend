import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';

const PORT: number = parseInt(process.env.PORT || '5000', 10);

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
