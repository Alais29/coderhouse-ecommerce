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

export interface IItemCarrito {
  producto: IItemAPI;
  quantity: number;
}

export interface IMessage {
  id?: number;
  user: IUser;
  text: string;
  type: 'usuario' | 'sistema';
  date: string;
}

export interface IUser {
  email: string;
  password: string;
  nombre?: string;
  direccion?: string;
  edad?: string;
  telefono?: string;
  foto?: string;
}

export interface IUserFormData extends FormData, IUser {}

export interface IItemQuery extends IObject {
  nombre?: string;
  // codigo?: string;
  // minPrice?: string;
  // maxPrice?: string;
  // minStock?: string;
  // maxStock?: string;
}
