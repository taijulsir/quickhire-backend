import { Job } from '../models/index.js';
import { sendResponse } from '../utils/response.js';

const getAllJobs = async (req, res, next) => {
  try {
    const { search, category, location, type, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [jobs, total] = await Promise.all([
      Job.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Job.countDocuments(query)
    ]);

    return sendResponse(res, 200, true, 'Jobs fetched successfully', {
      jobs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return sendResponse(res, 404, false, 'Job not found');
    }

    return sendResponse(res, 200, true, 'Job fetched successfully', job);
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const jobData = { ...req.body };
    
    if (req.file) {
      jobData.companyLogo = `/images/jobs/${req.file.filename}`;
    }

    const job = await Job.create(jobData);
    return sendResponse(res, 201, true, 'Job created successfully', job);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return sendResponse(res, 404, false, 'Job not found');
    }

    return sendResponse(res, 200, true, 'Job deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getFeaturedJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .sort({ created_at: -1 })
      .limit(8);

    return sendResponse(res, 200, true, 'Featured jobs fetched successfully', jobs);
  } catch (error) {
    next(error);
  }
};

const getLatestJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .sort({ created_at: -1 })
      .limit(8);

    return sendResponse(res, 200, true, 'Latest jobs fetched successfully', jobs);
  } catch (error) {
    next(error);
  }
};

const getJobCategories = async (req, res, next) => {
  try {
    const categories = await Job.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const formattedCategories = categories.map(cat => ({
      name: cat._id,
      count: cat.count
    }));

    return sendResponse(res, 200, true, 'Categories fetched successfully', formattedCategories);
  } catch (error) {
    next(error);
  }
};

export {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
  getFeaturedJobs,
  getLatestJobs,
  getJobCategories
};
