import { Document, Types } from 'mongoose';
import { IObject } from './others';

export interface ICarrito extends IObject, Document {
  id: string;
  user: Types.ObjectId;
  productos: {
    producto: Types.ObjectId;
    quantity: number;
  }[];
}

export interface IItemCarrito {
  producto: string;
  quantity: number;
}
