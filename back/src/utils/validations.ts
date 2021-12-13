import { isEmail, isUrl, isValidCode } from './strings';
import { IItem, IItemQuery } from 'common/interfaces/products';
import { IUserBase } from 'common/interfaces/users';
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

  // if (!isUrl(producto.foto)) {
  //   throw new ProductValidation(
  //     400,
  //     'Verifica los datos, la url de la foto no es válida',
  //   );
  // }

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

  if (!isEmail(user.email)) {
    throw new UserValidation(
      400,
      'Verifica los datos, debes ingresar un correo válido',
    );
  }

  if (user.password !== user.repeatPassword) {
    throw new UserValidation(
      400,
      'Verifica los datos, las contraseñas no coinciden.',
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

/**
 * Check if the data to create a user is valid
 * @param data user data to sign up
 * @returns Validates with Joi if all the fields are valid and returns the validation result
 */

// export const signupValidation = (data: IUserBase): Joi.ValidationResult => {
//   const userSchema = Joi.object({
//     email: Joi.string()
//       .pattern(new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/))
//       .required()
//       .messages({
//         'string.pattern.base': `El correo ingresado no es válido`,
//         'string.empty': `Todos los campos son obligatorios, por favor ingresa tu correo electrónico`,
//       }),
//     password: Joi.string()
//       .pattern(
//         new RegExp(
//           /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
//         ),
//       )
//       .required()
//       .messages({
//         'string.pattern.base': `La contraseña debe tener mínimo 8 caracteres, 1 letra mayúscula, 1 minúscula, 1 número y un caracter especial.`,
//         'string.empty': `Todos los campos son obligatorios, por favor ingresa una contraseña`,
//       }),
//     repeatPassword: Joi.string()
//       .required()
//       .valid(Joi.ref('password'))
//       .messages({
//         'string.empty': `Todos los campos son obligatorios, por favor confirma tu contraseña`,
//         'any.only': `Las contraseñas no coinciden`,
//       }),
//     nombre: Joi.string().required().messages({
//       'string.empty': `Todos los campos son obligatorios, por favor ingresa tu nombre`,
//     }),
//     direccion: Joi.string().required().messages({
//       'string.empty': `Todos los campos son obligatorios, por favor ingresa una dirección`,
//     }),
//     edad: Joi.number().integer().positive().required().messages({
//       'number.base': `La edad debe ser un número`,
//       'number.integer': `La edad debe ser un número entero`,
//       'number.positive': `La edad es obligatoria y debe ser mayor a 0`,
//     }),
//     telefono: Joi.string().required().messages({
//       'string.empty': `Todos los campos son obligatorios, por favor ingresa tu teléfono`,
//     }),
//     foto: Joi.string().required().messages({
//       'string.empty': `Todos los campos son obligatorios, por favor ingresa una foto para usar como imagen de tu perfil`,
//     }),
//   });

//   return schema.validate(data);
// };
