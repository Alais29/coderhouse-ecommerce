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

export interface IToastInfo {
  type: "" | "success" | "warning" | "danger";
  text: string;
}

export interface IMessage {
  id?: number;
  date?: string;
  email: string;
  text: string;
}

export interface IUser {
  username: string;
  password: string;
}

export interface IUserInfo {
  name: string;
  photo: string;
  email: string;
}
