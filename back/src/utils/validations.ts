import { isUrl, isValidCode } from '/utils/strings';
import { IItem } from '/common/interfaces';
import { EErrorCodes } from '/common/enums';
import { getEmptyFields } from '/utils/objects';

/**
 *
 * @param producto a product item
 * @returns checks if the product has empty fields, and if all the fields are valid, if they're not, it will return a proper error
 */
export const isValidProduct = (producto: IItem): boolean | Error => {
  const emptyFields = getEmptyFields(producto);

  if (emptyFields.length !== 0) {
    throw {
      error: `-${EErrorCodes.ProductValidation}`,
      message: 'Todos los campos excepto "stock" son obligatorios',
      descripcion: `Faltan los siguientes campos: ${emptyFields.join(', ')}`,
    };
  }

  if (isNaN(producto.precio) || producto.precio === 0) {
    throw {
      error: `-${EErrorCodes.ProductValidation}`,
      message:
        'Verifica los datos, el precio debe ser un número y no debe ser 0.',
    };
  }

  if (!isUrl(producto.foto)) {
    throw {
      error: `-${EErrorCodes.ProductValidation}`,
      message: 'Verifica los datos, la url de la foto no es válida',
    };
  }

  if (!isValidCode(producto.codigo)) {
    throw {
      error: `-${EErrorCodes.ProductValidation}`,
      message: 'Verifica los datos, el código ingresado no es válido',
    };
  }

  if (isNaN(producto.stock)) {
    throw {
      error: `-${EErrorCodes.ProductValidation}`,
      message: 'Verifica los datos, el stock debe ser un número',
    };
  }

  return true;
};
