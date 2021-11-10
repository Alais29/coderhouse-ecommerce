import { IObject } from './others';

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

export interface IItemQuery extends IObject {
  nombre?: string;
  codigo?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
}
