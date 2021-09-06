import { EErrorCodes } from 'common/enums';

export class ProductValidation extends Error {
  public error: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.error = `-${EErrorCodes.ProductValidation}`;
  }
}

export class MissingFieldsProduct extends ProductValidation {
  public descripcion: string;
  constructor(message: string, descripcion?: string) {
    super(message);
    this.descripcion = descripcion || '';
  }
}

export class NotFound extends Error {
  public error: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.error = `-${EErrorCodes.ProductNotFound}`;
  }
}

export class RepeatedProductInCart extends Error {
  public error: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.error = `-${EErrorCodes.ProductRepeated}`;
  }
}
