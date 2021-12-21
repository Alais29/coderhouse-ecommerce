import { isValidCode } from './strings';
import { IItem, IItemQuery } from 'common/interfaces/products';
import { getEmptyFields } from './objects';
import { MissingFieldsProduct, ProductValidation } from 'errors';

/**
 * checks if the product has empty fields, and if all the fields are valid, if they're not, it will return a proper error
 * @param producto a product item
 * @param exceptions array of product properties that can be empty
 * @returns true or an Error
 */
export const isValidProduct = (
  producto: IItem,
  exceptions: string[] = [],
): boolean | Error => {
  const emptyFields = getEmptyFields(producto, exceptions);

  if (emptyFields.length !== 0) {
    throw new MissingFieldsProduct(
      400,
      'Todos los campos excepto "stock" son obligatorios',
      `Faltan los siguientes campos: ${emptyFields.join(', ')}`,
    );
  }

  if (isNaN(producto.precio) || producto.precio === 0) {
    throw new ProductValidation(
      400,
      'Verifica los datos, el precio debe ser un número y no debe ser 0.',
    );
  }

  if (!isValidCode(producto.codigo)) {
    throw new ProductValidation(
      400,
      'Verifica los datos, el código ingresado no es válido',
    );
  }

  if (isNaN(producto.stock)) {
    throw new ProductValidation(
      400,
      'Verifica los datos, el stock debe ser un número',
    );
  }

  return true;
};

export const isQueryValid = (query: IItemQuery): boolean | Error => {
  const queryMap = ['minPrice', 'maxPrice', 'minStock', 'maxStock'];

  for (const queryField of queryMap) {
    if (query[queryField] !== undefined && isNaN(Number(query[queryField]))) {
      throw new ProductValidation(
        400,
        'Los valores de precio/stock mínimo/máximo deben ser números',
      );
    }
  }

  return true;
};
