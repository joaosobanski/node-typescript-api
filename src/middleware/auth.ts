import { IRequest } from '@src/interfaces/IRequest';
import { Request, Response, NextFunction } from 'express';
import AuthService, { DecodedUser } from './AuthService';

export function authMiddleware(
  req: IRequest,
  res: Partial<Response>,
  next: NextFunction
): void {
  const token = req.headers?.['authorization']?.split(' ')[1];
  try {
    const decoded = AuthService.decodeToken(token as string);
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status?.(401).send({ code: 401, error: err.message });
    } else {
      res.status?.(401).send({ code: 401, error: 'Unknown auth error' });
    }
  }
}

