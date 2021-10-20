export interface IObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IItem {
  nombre: string;
  descripcion: string;
  codigo: string;
  precio: string;
  foto: string;
  stock: string;
}

export interface IItemAPI extends IItem {
  id: string;
  timestamp: string;
}

export interface IMessage {
  id?: number;
  date?: string;
  email: string;
  text: string;
}

export interface IUser {
  email: string;
  password: string;
  nombre?: string;
  direccion?: string;
  edad?: string;
  telefono?: string;
}
