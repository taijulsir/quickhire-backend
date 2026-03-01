import { Response, NextFunction } from 'express';
import { generateToken } from '../utils/jwt.js';
import { sendResponse } from '../utils/response.js';
import { Job, Application } from '../models/index.js';
import { AuthRequest } from '../middlewares/auth.js';

const isProduction = process.env.NODE_ENV === 'production';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      sendResponse(res, 401, false, 'Invalid credentials');
      return;
    }

    const token = generateToken({ id: adminEmail as string, role: 'admin' });

    res.cookie('token', token, COOKIE_OPTIONS);

    sendResponse(res, 200, true, 'Login successful', {
      user: { id: adminEmail, email: adminEmail, role: 'admin' },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
    });

    sendResponse(res, 200, true, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

export const checkAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    sendResponse(res, 200, true, 'Authenticated', { user: req.user });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const recentJobs = await Job.find().sort({ created_at: -1 }).limit(10);
    const activeJobsCount = totalJobs;

    const jobTypes = await Job.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);
    const jobTypesSummary = jobTypes.reduce(
      (acc: Record<string, number>, curr: { _id: string; count: number }) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      {}
    );

    const today = new Date();
    const chartData = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return {
        _id: d.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 20,
        applications: 0,
      };
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentApps = await Application.aggregate([
      { $match: { created_at: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$created_at' },
          },
          applications: { $sum: 1 },
        },
      },
    ]);

    recentApps.forEach(
      (app: { _id: string; applications: number }) => {
        const day = chartData.find((d) => d._id === app._id);
        if (day) day.applications = app.applications;
      }
    );

    sendResponse(res, 200, true, 'Dashboard stats fetched successfully', {
      totalJobs,
      totalApplications,
      activeJobsCount,
      jobTypesSummary,
      chartData,
      recentJobs,
    });
  } catch (error) {
    next(error);
  }
};
