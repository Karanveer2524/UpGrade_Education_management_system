import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(403).json({ message: 'Unauthorized' });
    return;
  }

  next();
};
