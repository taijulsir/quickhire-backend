import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  role: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: '7d' };
  return jwt.sign(payload, process.env.JWT_SECRET as string, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};
