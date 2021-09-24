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
  author: {
    id: string;
    nombre: string;
    apellido: string;
    edad: number;
    alias: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  id: string;
}
