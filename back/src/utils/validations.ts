import { isUrl, isValidCode } from './strings';
import { IItem } from 'common/interfaces';
import { getEmptyFields } from './objects';
import { MissingFieldsProduct, ProductValidation } from 'errors';

/**
 *
 * @param producto a product item
 * @returns checks if the product has empty fields, and if all the fields are valid, if they're not, it will return a proper error
 */
export const isValidProduct = (producto: IItem): boolean | Error => {
  const emptyFields = getEmptyFields(producto);

  if (emptyFields.length !== 0) {
    throw new MissingFieldsProduct(
      'Todos los campos excepto "stock" son obligatorios',
      `Faltan los siguientes campos: ${emptyFields.join(', ')}`
    );
  }

  if (isNaN(producto.precio) || producto.precio === 0) {
    throw new ProductValidation(
      'Verifica los datos, el precio debe ser un número y no debe ser 0.'
    );
  }

  if (!isUrl(producto.foto)) {
    throw new ProductValidation(
      'Verifica los datos, la url de la foto no es válida'
    );
  }

  if (!isValidCode(producto.codigo)) {
    throw new ProductValidation(
      'Verifica los datos, el código ingresado no es válido'
    );
  }

  if (isNaN(producto.stock)) {
    throw new ProductValidation(
      'Verifica los datos, el stock debe ser un número'
    );
  }

  return true;
};
