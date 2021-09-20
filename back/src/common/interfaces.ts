import { Document, ObjectId, Model } from 'mongoose';

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

export interface IItemMongoDoc extends IItemBase, Document {
  _id: ObjectId;
}

export interface IItemMongoModel extends Model<IItemMongoDoc> {
  get: (id?: string) => Promise<IItemMongoDoc[]>;
}

export interface IItemQuery {
  nombre?: string;
  codigo?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  cant?: number;
}
