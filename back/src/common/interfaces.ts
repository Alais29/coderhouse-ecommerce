import { Document, Types } from 'mongoose';

export interface IObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IKnex {
  [key: string]: {
    client: string;
    connection: {
      host?: string;
      user?: string;
      password?: string;
      database?: string;
      filename?: string;
    };
    migrations?: {
      directory: string;
    };
    seeds?: {
      directory: string;
    };
    pool?: {
      min?: number;
      max?: number;
    };
    useNullAsDefault?: boolean;
  };
}

export interface IItemBase extends IObject {
  nombre: string;
  descripcion: string;
  codigo: string;
  precio: number;
  foto: string;
  timestamp: string;
  stock: number;
}

export interface IItem extends IItemBase, IObject {
  id: string;
}

export interface ICarrito extends IObject, Document {
  id: string;
  user: Types.ObjectId;
  productos: Types.ObjectId[];
}

export interface IItemQuery {
  nombre?: string;
  codigo?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
}

export interface IUserBase extends IObject {
  email: string;
  password: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  foto: string;
}

export interface IUser extends IUserBase {
  id: string;
  cart?: Types.ObjectId;
  isValidPassword: (password: string) => Promise<boolean>;
}
