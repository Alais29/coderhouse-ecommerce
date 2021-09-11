import { Document, ObjectId, Model } from 'mongoose';

export interface IObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IItemBase {
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
  _id: ObjectId
}

export interface IItemMongoModel extends Model<IItemMongoDoc> {
  get: (id?: string) => Promise<IItemMongoDoc[]>
}

export interface IMesssage {
  email: string
  text: string
  date: string
}

export interface IMesssageDoc extends Document {
  _id: ObjectId
}