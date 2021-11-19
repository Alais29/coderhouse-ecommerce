import { ErrorRequestHandler } from 'express';
import Config from 'config';
import { logger } from 'services/logger';

interface IErrorInfo {
  error: string;
  name: string;
  message: string;
  descripcion?: string;
  stack: string;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode, name, message, error, stack, descripcion } = err;
  const errorInfo: IErrorInfo = {
    error,
    name,
    message,
    stack,
  };
  if (descripcion) {
    errorInfo.descripcion = descripcion;
  }
  if (Config.NODE_ENV !== 'test')
    logger.error(`Error: ${error}, Message: ${message}, Stack: ${stack} `);

  res.status(statusCode || 500).json(errorInfo);
};
