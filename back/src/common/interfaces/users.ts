import Joi from 'joi';
import { IObject } from './others';

export interface IUserBase extends IObject {
  email: string;
  password: string;
  repeatPassword: string;
  nombre: string;
  calle: string;
  altura: string;
  codigoPostal: string;
  piso?: string;
  depto?: string;
  edad: number;
  telefono: string;
  foto: string;
  fotoId: string;
  admin?: boolean;
}

export interface IUser extends IUserBase {
  id: string;
  isValidPassword: (password: string) => Promise<boolean>;
}

export const userJoiSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/))
    .required()
    .messages({
      'string.pattern.base': `El correo ingresado no es válido`,
      'string.empty': `Todos los campos son obligatorios, por favor ingresa tu correo electrónico`,
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      ),
    )
    .required()
    .messages({
      'string.pattern.base': `La contraseña debe tener mínimo 8 caracteres, 1 letra mayúscula, 1 minúscula, 1 número y un caracter especial.`,
      'string.empty': `Por favor ingresa una contraseña`,
    }),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'string.empty': `Por favor confirma tu contraseña`,
    'any.only': `Las contraseñas no coinciden`,
  }),
  nombre: Joi.string().required().messages({
    'string.empty': `Por favor ingresa tu nombre`,
  }),
  calle: Joi.string().required().messages({
    'string.empty': `Por favor ingresa una calle`,
  }),
  altura: Joi.string().required().messages({
    'string.empty': `Por favor ingresa el número de calle`,
  }),
  codigoPostal: Joi.string().required().messages({
    'string.empty': `Por favor ingresa tu código postal`,
  }),
  piso: Joi.string().allow(''),
  depto: Joi.string().allow(''),
  edad: Joi.number().integer().positive().required().messages({
    'number.base': `La edad debe ser un número`,
    'number.integer': `La edad debe ser un número entero`,
    'number.positive': `La edad es obligatoria y debe ser mayor a 0`,
  }),
  telefono: Joi.string().required().messages({
    'string.empty': `Por favor ingresa tu teléfono`,
  }),
  admin: Joi.boolean().default(false),
});
