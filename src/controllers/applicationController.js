import { Application, Job } from '../models/index.js';
import { sendResponse } from '../utils/response.js';

const createApplication = async (req, res, next) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    const job = await Job.findById(job_id);
    if (!job) {
      return sendResponse(res, 404, false, 'Job not found');
    }

    const application = await Application.create({
      job_id,
      name,
      email,
      resume_link,
      cover_note
    });

    return sendResponse(res, 201, true, 'Application submitted successfully', application);
  } catch (error) {
    next(error);
  }
};

const getApplicationsByJob = async (req, res, next) => {
  try {
    const applications = await Application.find({ job_id: req.params.jobId })
      .sort({ created_at: -1 });

    return sendResponse(res, 200, true, 'Applications fetched successfully', applications);
  } catch (error) {
    next(error);
  }
};

const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate('job_id', 'title company')
      .sort({ created_at: -1 });

    return sendResponse(res, 200, true, 'Applications fetched successfully', applications);
  } catch (error) {
    next(error);
  }
};

export {
  createApplication,
  getApplicationsByJob,
  getAllApplications
};
