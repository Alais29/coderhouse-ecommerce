export interface IItem {
  nombre: string
  descripcion: string
  codigo: string
  precio: string
  foto: string
  stock: string
}

export interface IItemAPI extends IItem {
  id: string
  timestamp: string
}

export interface IAlert {
  show: boolean;
  text: string;
}
