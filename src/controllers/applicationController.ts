import { Request, Response, NextFunction } from 'express';
import { Application, Job } from '../models/index.js';
import { sendResponse } from '../utils/response.js';

export const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    const job = await Job.findById(job_id);
    if (!job) {
      sendResponse(res, 404, false, 'Job not found');
      return;
    }

    const application = await Application.create({
      job_id,
      name,
      email,
      resume_link,
      cover_note,
    });

    sendResponse(
      res,
      201,
      true,
      'Application submitted successfully',
      application
    );
  } catch (error) {
    next(error);
  }
};

export const getApplicationsByJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const applications = await Application.find({
      job_id: req.params.jobId,
    }).sort({ created_at: -1 });

    sendResponse(
      res,
      200,
      true,
      'Applications fetched successfully',
      applications
    );
  } catch (error) {
    next(error);
  }
};

export const getAllApplications = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const applications = await Application.find()
      .populate('job_id', 'title company')
      .sort({ created_at: -1 });

    sendResponse(
      res,
      200,
      true,
      'Applications fetched successfully',
      applications
    );
  } catch (error) {
    next(error);
  }
};
