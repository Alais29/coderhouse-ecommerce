import { Types, Document } from 'mongoose';
import { IItemCarrito } from './carrito';

export interface IOrderBase {
  productos: IItemCarrito[];
  estado: 'generada' | 'completada';
  total: number;
  direccionEntrega: string;
  codigoPostal: string;
}

export interface IOrder extends IOrderBase, Document {
  id: string;
  user: Types.ObjectId;
}
