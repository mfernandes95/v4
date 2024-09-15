import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../src/application/errors/CustomError';

function globalErrorHandler(
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = (err as CustomError).statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: message,
  });

  next();
}

export default globalErrorHandler;
