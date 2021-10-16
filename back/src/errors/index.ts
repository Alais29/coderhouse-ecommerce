import { EErrorCodes } from 'common/enums';

export class BaseError extends Error {
  public name;
  public statusCode;
  public message;
  constructor(statusCode: number, message: string) {
    super();
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    // Con esto se puede acceder al stacktrace del error con this.stack
    Error.captureStackTrace(this);
  }
}

export class ProductValidation extends BaseError {
  public error: string;
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.error = `-${EErrorCodes.ProductValidation}`;
  }
}

export class MissingFieldsProduct extends ProductValidation {
  public descripcion;
  constructor(statusCode: number, message: string, descripcion: string) {
    super(statusCode, message);
    this.descripcion = descripcion;
  }
}

export class NotFound extends BaseError {
  public error: string;
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.error = `-${EErrorCodes.ProductNotFound}`;
  }
}

export class RepeatedProductInCart extends BaseError {
  public error: string;
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.error = `-${EErrorCodes.ProductRepeated}`;
  }
}

export class UnauthorizedRoute extends BaseError {
  public error: string;
  public descripcion: string;
  constructor(statusCode: number, message: string, descripcion?: string) {
    super(statusCode, message);
    this.error = `-${EErrorCodes.UnauthorizedRoute}`;
    this.descripcion =
      descripcion || 'No tienes permisos para realizar esa acción';
  }
}
