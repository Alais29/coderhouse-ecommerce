import { Document, Types } from 'mongoose';
import { IObject } from './others';
import { IItem } from './products';

export interface ICarrito extends IObject, Document {
  id: string;
  user: Types.ObjectId;
  productos: IItemCarrito[];
}

export interface IItemCarrito {
  producto: Types.ObjectId | IItem;
  quantity: number;
}
