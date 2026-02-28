import { Request, Response, NextFunction } from 'express';
import { Job } from '../models/index.js';
import { sendResponse } from '../utils/response.js';

interface JobQuery {
  $or?: Array<Record<string, unknown>>;
  category?: string;
  location?: Record<string, unknown>;
  type?: string;
}

export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { search, category, location, type, page = 1, limit = 10 } = req.query;
    const query: JobQuery = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category as string;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (type) {
      query.type = type as string;
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [jobs, total] = await Promise.all([
      Job.find(query).sort({ created_at: -1 }).skip(skip).limit(limitNum),
      Job.countDocuments(query),
    ]);

    sendResponse(res, 200, true, 'Jobs fetched successfully', {
      jobs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      sendResponse(res, 404, false, 'Job not found');
      return;
    }

    sendResponse(res, 200, true, 'Job fetched successfully', job);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobData = { ...req.body };

    if (req.file) {
      jobData.companyLogo = `/images/jobs/${req.file.filename}`;
    }

    const job = await Job.create(jobData);
    sendResponse(res, 201, true, 'Job created successfully', job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobData = { ...req.body };

    if (req.file) {
      jobData.companyLogo = `/images/jobs/${req.file.filename}`;
    }

    if (jobData.tags && typeof jobData.tags === 'string') {
      try {
        jobData.tags = JSON.parse(jobData.tags);
      } catch {
        jobData.tags = jobData.tags.split(',').map((tag: string) => tag.trim());
      }
    }

    const job = await Job.findByIdAndUpdate(req.params.id, jobData, {
      new: true,
    });

    if (!job) {
      sendResponse(res, 404, false, 'Job not found');
      return;
    }

    sendResponse(res, 200, true, 'Job updated successfully', job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      sendResponse(res, 404, false, 'Job not found');
      return;
    }

    sendResponse(res, 200, true, 'Job deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const getFeaturedJobs = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobs = await Job.find().sort({ created_at: -1 }).limit(8);
    sendResponse(res, 200, true, 'Featured jobs fetched successfully', jobs);
  } catch (error) {
    next(error);
  }
};

export const getLatestJobs = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobs = await Job.find().sort({ created_at: -1 }).limit(8);
    sendResponse(res, 200, true, 'Latest jobs fetched successfully', jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await Job.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const formattedCategories = categories.map(
      (cat: { _id: string; count: number }) => ({
        name: cat._id,
        count: cat.count,
      })
    );

    sendResponse(
      res,
      200,
      true,
      'Categories fetched successfully',
      formattedCategories
    );
  } catch (error) {
    next(error);
  }
};
