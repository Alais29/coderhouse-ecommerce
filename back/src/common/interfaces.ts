export interface IObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IItem extends IObject {
  id: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  precio: number;
  foto: string;
  timestamp: string;
  stock: number;
}

export interface IMesssage {
  email: string
  text: string
}