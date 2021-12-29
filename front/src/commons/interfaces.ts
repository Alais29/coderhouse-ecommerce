export interface IObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IItem {
  nombre: string;
  descripcion: string;
  codigo: string;
  precio: string;
  categoria: string;
  fotos: string[];
  stock: string;
}

export interface IItemFormData extends FormData, IItem {}

export interface IItemAPI extends IItem {
  id: string;
  fotosId: string[];
  timestamp: string;
}

export interface IItemAPIFormData extends FormData, IItemAPI {}

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
  calle?: string;
  altura?: string;
  codigoPostal?: string;
  piso?: string;
  depto?: string;
  edad?: string;
  telefono?: string;
  foto?: string;
  fotoId?: string;
  admin?: boolean;
}

export interface IUserFormData extends FormData, IUser {}

export interface IItemQuery extends IObject {
  nombre?: string;
}

export interface IOrder {
  id: string;
  user: {
    email: string;
    nombre: string;
    id: string;
  };
  productos: IItemCarrito[];
  estado: 'generada' | 'completada';
  total: number;
  direccionEntrega: string;
  codigoPostal: string;
  timestamp: string;
}
