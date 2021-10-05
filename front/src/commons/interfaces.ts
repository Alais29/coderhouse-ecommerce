export interface IItem {
  id?: string;
  timestamp?: string;
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
