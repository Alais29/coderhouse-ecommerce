import Joi from 'joi';
import { IObject } from './others';

export interface IUserBase extends IObject {
  email: string;
  password: string;
  repeatPassword: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  foto: string;
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
      'string.empty': `Todos los campos son obligatorios, por favor ingresa una contraseña`,
    }),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'string.empty': `Todos los campos son obligatorios, por favor confirma tu contraseña`,
    'any.only': `Las contraseñas no coinciden`,
  }),
  nombre: Joi.string().required().messages({
    'string.empty': `Todos los campos son obligatorios, por favor ingresa tu nombre`,
  }),
  direccion: Joi.string().required().messages({
    'string.empty': `Todos los campos son obligatorios, por favor ingresa una dirección`,
  }),
  edad: Joi.number().integer().positive().required().messages({
    'number.base': `La edad debe ser un número`,
    'number.integer': `La edad debe ser un número entero`,
    'number.positive': `La edad es obligatoria y debe ser mayor a 0`,
  }),
  telefono: Joi.string().required().messages({
    'string.empty': `Todos los campos son obligatorios, por favor ingresa tu teléfono`,
  }),
  foto: Joi.string().required().messages({
    'string.empty': `Todos los campos son obligatorios, por favor ingresa una foto para usar como imagen de tu perfil`,
  }),
});
