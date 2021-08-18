import { Request } from 'express';

/**
 * 
 * @param item string, number, array, or object
 * @returns Determines if the item passed as argument is empty or not
 */
export const isEmpty = (item: string | number | unknown): boolean => {
  switch (typeof item) {
    case 'string':
      if (item !== '' && item !== 'null' && item !== 'undefined') {
        return false;
      }
      return true;
    case 'number':
      return false;
    case 'object':
      if (JSON.stringify(item) === '{}' || JSON.stringify(item) === '[]') {
        return true;
      }
      return false;
  }
  return true;
};

/**
 * 
 * @param req request object
 * @throws throws the specified error
 */
export const throwUnauthorizedError = (req: Request): Error => {
  throw {
    error: '-1',
    descripcion: `Ruta ${req.originalUrl} método ${req.method} no autorizada`,
    message: 'No tienes permisos para realizar esa acción'
  };
};