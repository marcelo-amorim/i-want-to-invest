import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  assessorId: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT não identificado.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, assessorId } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    request.assessor = {
      id: assessorId,
    };

    return next();
  } catch {
    throw new AppError('Token JWT inválido.', 401);
  }
}
