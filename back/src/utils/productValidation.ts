import { isUrl, isValidCode } from './strings';
import { IItem } from '../common/interfaces';
import { getEmptyFields } from './objects';

export const isValidProduct = (producto: IItem): boolean | Error => {
  const emptyFields = getEmptyFields(producto);

  if (emptyFields.length !== 0) {
    throw {
      message: 'Todos los campos excepto "stock" son obligatorios',
      error: `Faltan los siguientes campos: ${emptyFields.join(', ')}`
    };
  }
  
  if (isNaN(producto.precio) || producto.precio === 0) {
    throw new Error(
      'Verifica los datos, el precio debe ser un número y no debe ser 0.'
    );
  }
  
  if (!isUrl(producto.foto)) {
    throw new Error(
      'Verifica los datos, la url de la foto no es válida'
    );
  }

  if (!isValidCode(producto.codigo)) {
    throw new Error(
      'Verifica los datos, el código ingresado no es válido'
    );
  }

  if (isNaN(producto.stock)) {
    throw new Error(
      'Verifica los datos, el stock debe ser un número'
    );
  }

  return true;
};