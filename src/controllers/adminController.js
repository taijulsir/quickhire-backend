import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import { sendResponse } from '../utils/response.js';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return sendResponse(res, 401, false, 'Invalid credentials');
    }

    const token = generateToken({ email: adminEmail, role: 'admin' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return sendResponse(res, 200, true, 'Login successful', { token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });

    return sendResponse(res, 200, true, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    return sendResponse(res, 200, true, 'Authenticated', { admin: req.admin });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const Job = (await import('../models/Job.js')).default;
    const Application = (await import('../models/Application.js')).default;

    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    // Stats for the "Job Open" card
    const recentJobs = await Job.find().sort({ created_at: -1 }).limit(10);
    const activeJobsCount = totalJobs; // Simplified for now since there's no status field

    // Stats for "Applicants Summary" card
    const jobTypes = await Job.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    const jobTypesSummary = jobTypes.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});


    // Mock data for views vs applications chart for the last 7 days
    const today = new Date();
    const chartData = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return {
        _id: d.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 20, // Mock view data since we don't track it yet
        applications: 0
      };
    });

    // Populate actual applications for the last 7 days chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentApps = await Application.aggregate([
      { $match: { created_at: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
          applications: { $sum: 1 }
        }
      }
    ]);

    recentApps.forEach(app => {
      const day = chartData.find(d => d._id === app._id);
      if (day) day.applications = app.applications;
    });

    return sendResponse(res, 200, true, 'Dashboard stats fetched successfully', {
      totalJobs,
      totalApplications,
      activeJobsCount,
      jobTypesSummary,
      chartData,
      recentJobs
    });
  } catch (error) {
    next(error);
  }
};

export {
  login,
  logout,
  checkAuth,
  getDashboardStats
};

