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

export {
  login,
  logout,
  checkAuth
};
