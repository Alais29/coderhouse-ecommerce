import { Document, Types } from 'mongoose';
import { IObject } from './others';

export interface ICarrito extends IObject, Document {
  id: string;
  user: Types.ObjectId;
  productos: IItemCarrito[];
}

export interface IItemCarrito {
  producto: Types.ObjectId;
  quantity: number;
}
