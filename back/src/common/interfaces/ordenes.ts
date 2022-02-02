import { Types, Document } from 'mongoose';

export interface IOrderProduct {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
}
export interface IOrderBase {
  productos: {
    producto: IOrderProduct;
    quantity: number;
  }[];
  estado: 'generada' | 'completada';
  total: number;
  direccionEntrega: string;
  codigoPostal: string;
}

export interface IOrder extends IOrderBase, Document {
  id: string;
  user: Types.ObjectId;
}
