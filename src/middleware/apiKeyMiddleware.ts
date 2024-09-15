import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
dotenv.config();

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['api-key'] as string || req.query.api_key as string;

  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
};

export default apiKeyMiddleware;
