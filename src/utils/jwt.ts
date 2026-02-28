import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const generateToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as string as unknown as SignOptions['expiresIn'],
  };
  return jwt.sign(payload, process.env.JWT_SECRET as string, options);
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
