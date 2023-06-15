import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return res.status(500).end();
  }
}
