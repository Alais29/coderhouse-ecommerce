import { isUrl, isValidCode } from './strings';
import { IItem, IItemQuery, IUserBase } from 'common/interfaces';
import { getEmptyFields } from './objects';
import {
  MissingFieldsProduct,
  MissingFieldsUser,
  ProductValidation,
  UserValidation,
} from 'errors';

/**
 *
 * @param producto a product item
 * @returns checks if the product has empty fields, and if all the fields are valid, if they're not, it will return a proper error
 */
export const isValidProduct = (producto: IItem): boolean | Error => {
  const emptyFields = getEmptyFields(producto);

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

  if (!isUrl(producto.foto)) {
    throw new ProductValidation(
      400,
      'Verifica los datos, la url de la foto no es válida',
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

/**
 *
 * @param user user data to sign up
 * @returns checks if the user data has empty fields or if 'edad' is not a number, if so throws a proper error
 */

export const isValidUser = (user: IUserBase): boolean | Error => {
  const emptyFields = getEmptyFields(user);

  if (emptyFields.length !== 0) {
    throw new MissingFieldsUser(
      400,
      'Todos los campos son obligatorios',
      `Faltan los siguientes campos: ${emptyFields.join(', ')}`,
    );
  }

  if (isNaN(user.edad) || user.edad === 0) {
    throw new UserValidation(
      400,
      'Verifica los datos, la edad debe ser un número y no debe ser 0.',
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
