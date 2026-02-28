import { Response } from 'express';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: unknown = null
): Response<ApiResponse> => {
  const response: ApiResponse = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};
